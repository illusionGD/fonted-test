const fs = require('fs');
const path = require('path');
const { Application } = require('@pixi/node');
const { Texture, BaseTexture } = require('pixi.js');
const { Spine } = require('@esotericsoftware/spine-pixi-v8');
const { AtlasAttachmentLoader, SkeletonJson } = require('@esotericsoftware/spine-core');
const Jimp = require('jimp');
const GIFEncoder = require('gif-encoder');
const AdmZip = require('adm-zip');

/**
 * 导出Spine动画为序列帧
 * 
 * @param {Object} options 配置选项
 * @param {string} options.jsonPath Spine JSON文件路径
 * @param {string} options.atlasPath Spine atlas文件路径
 * @param {string} options.texturePath 纹理图片路径
 * @param {string} options.outputDir 输出目录
 * @param {string} options.animationName 要导出的动画名称
 * @param {number} [options.fps=24] 导出帧率
 * @param {number} [options.scale=1.0] 缩放比例
 * @param {number} [options.quality=100] 输出质量 (0-100)
 * @param {boolean} [options.transparent=true] 是否保留透明通道
 * @param {number} [options.padding=20] 图片边界填充(pixels)
 * @param {boolean} [options.verbose=true] 是否显示详细输出
 * @param {boolean} [options.exportPng=true] 导出PNG序列
 * @param {boolean} [options.exportGif=true] 导出GIF动画
 * @param {boolean} [options.exportZip=true] 导出ZIP压缩包
 */
async function exportSpineFrames(options) {
    // 参数验证和默认值
    const {
        jsonPath,
        atlasPath,
        texturePath,
        outputDir,
        animationName,
        fps = 24,
        scale = 1.0,
        quality = 100,
        transparent = true,
        padding = 20,
        verbose = true,
        exportPng = true,
        exportGif = true,
        exportZip = true
    } = options;

    // 验证必要参数
    if (!fs.existsSync(jsonPath)) throw new Error(`JSON文件不存在: ${jsonPath}`);
    if (!fs.existsSync(atlasPath)) throw new Error(`Atlas文件不存在: ${atlasPath}`);
    if (!fs.existsSync(texturePath)) throw new Error(`纹理文件不存在: ${texturePath}`);

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 创建日志函数
    const log = verbose ? console.log : () => {};

    try {
        log('🚀 开始导出Spine动画序列帧');
        log(`动画名称: ${animationName}`);
        log(`导出帧率: ${fps} FPS`);
        log(`输出目录: ${outputDir}`);
        log('-------------------------');

        // 1. 创建Headless Pixi应用
        const app = new Application({
            width: 2048,
            height: 2048,
            backgroundAlpha: 0
        });

        // 2. 加载纹理
        const texture = Texture.from(texturePath);
        await new Promise(resolve => texture.on('update', resolve));
        const baseTexture = texture.baseTexture;
        log(`✅ 纹理加载成功 (${texture.width}x${texture.height})`);

        // 3. 解析Atlas数据
        const atlasData = fs.readFileSync(atlasPath, 'utf-8');
        const atlas = new spine.TextureAtlas(atlasData, (line, callback) => {
            callback(baseTexture);
        });

        // 4. 创建Spine附件加载器
        const attachmentLoader = new AtlasAttachmentLoader(atlas);

        // 5. 解析Spine JSON数据
        const spineData = new SkeletonJson(attachmentLoader);
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const skeletonData = spineData.readSkeletonData(jsonData);
        log(`✅ Spine数据解析完成 (${skeletonData.animations.length} 个动画)`);

        // 6. 创建Spine实例
        const spine = new Spine(skeletonData);
        app.stage.addChild(spine);

        // 7. 验证动画是否存在
        const animation = skeletonData.findAnimation(animationName);
        if (!animation) {
            const availableAnimations = skeletonData.animations.map(a => a.name).join(', ');
            throw new Error(`动画"${animationName}"不存在。可用动画: ${availableAnimations}`);
        }

        // 8. 设置动画
        spine.state.setAnimation(0, animationName, false);
        spine.state.time = 0;
        spine.state.apply(spine.skeleton);

        // 9. 计算动画长度和帧数
        const animationDuration = animation.duration;
        const frameCount = Math.max(1, Math.floor(animationDuration * fps));
        const timePerFrame = animationDuration / frameCount;
        log(`动画时长: ${animationDuration.toFixed(3)}秒`);
        log(`导出帧数: ${frameCount}帧 (间隔:${timePerFrame.toFixed(4)}秒)`);

        // 10. 计算边界
        const bounds = calculateAnimationBounds(spine, padding, scale, animation);
        log(`动画边界: ${bounds.width.toFixed(1)}x${bounds.height.toFixed(1)} (含${padding}px填充)`);

        // 11. 重新设置Pixi应用尺寸
        app.renderer.resize(bounds.width, bounds.height);
        spine.position.set(bounds.width / 2, bounds.height - (bounds.height - bounds.minHeight) / 2 - padding);
        spine.scale.set(scale);

        // 12. 导出帧数据
        const frames = [];
        for (let i = 0; i < frameCount; i++) {
            // 更新动画状态
            spine.state.time = i * timePerFrame;
            spine.state.apply(spine.skeleton);
            spine.update(timePerFrame);
            spine.skeleton.updateWorldTransform();

            // 渲染帧
            app.render();

            // 提取帧数据
            const frameData = app.renderer.extract.pixels();
            frames.push({
                index: i,
                time: spine.state.time,
                pixels: frameData
            });

            if (verbose && (i % 10 === 0 || i === frameCount - 1)) {
                log(`🔄 渲染帧 ${i + 1}/${frameCount} (${((i + 1) / frameCount * 100).toFixed(1)}%)`);
            }
        }

        log(`✅ 全部帧渲染完成 (${frames.length}帧)`);

        // 13. 导出结果
        const exportPromises = [];
        const frameFiles = [];
        const cleanName = animationName.replace(/[^a-z0-9]/gi, '_');

        // 导出PNG序列
        if (exportPng) {
            exportPromises.push((async () => {
                const pngDir = path.join(outputDir, 'png_frames');
                if (!fs.existsSync(pngDir)) fs.mkdirSync(pngDir);
                
                log(`📸 导出PNG序列到: ${pngDir}`);
                
                for (let i = 0; i < frames.length; i++) {
                    const frame = frames[i];
                    const filePath = path.join(pngDir, `${cleanName}_${String(i).padStart(4, '0')}.png`);
                    
                    const image = new Jimp(bounds.width, bounds.height, 0x00000000);
                    image.bitmap.data = Buffer.from(frame.pixels);
                    
                    await image.writeAsync(filePath);
                    frameFiles.push(filePath);
                    
                    if (verbose && (i % 10 === 0 || i === frames.length - 1)) {
                        log(`  🔍 导出PNG: ${i + 1}/${frames.length}`);
                    }
                }
                
                log(`✅ PNG序列导出完成 (${frames.length}张图片)`);
            })());
        }

        // 导出GIF
        if (exportGif) {
            exportPromises.push((async () => {
                const gifPath = path.join(outputDir, `${cleanName}.gif`);
                log(`🎞️  导出GIF动画到: ${gifPath}`);
                
                const gif = new GIFEncoder(bounds.width, bounds.height);
                gif.setDelay(1000 / fps);
                gif.setQuality(quality);
                if (transparent) gif.setTransparent(0x000000);
                
                const stream = fs.createWriteStream(gifPath);
                gif.pipe(stream);
                gif.writeHeader();
                
                for (let i = 0; i < frames.length; i++) {
                    const frame = frames[i];
                    const image = new Jimp(bounds.width, bounds.height, 0x00000000);
                    image.bitmap.data = Buffer.from(frame.pixels);
                    
                    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
                    gif.addFrame(buffer);
                    
                    if (verbose && (i % 10 === 0 || i === frames.length - 1)) {
                        log(`  🔍 生成GIF帧: ${i + 1}/${frames.length}`);
                    }
                }
                
                gif.finish();
                await new Promise(resolve => stream.on('finish', resolve));
                
                log(`✅ GIF导出完成 (${gifPath})`);
            })());
        }

        // 等待所有导出完成
        await Promise.all(exportPromises);

        // 导出ZIP压缩包
        if (exportZip && frameFiles.length > 0) {
            log(`📦 创建ZIP压缩包...`);
            
            const zip = new AdmZip();
            frameFiles.forEach(file => {
                zip.addLocalFile(file);
            });
            
            const zipPath = path.join(outputDir, `${cleanName}_frames.zip`);
            zip.writeZip(zipPath);
            
            log(`✅ ZIP压缩包创建完成: ${zipPath}`);
        }

        // 清理资源
        app.destroy(true, { children: true });
        log('🎉 导出完成！');
        log('=====================================');
    } catch (error) {
        console.error('❌ 导出失败:', error.message);
        if (error.stack) console.error(error.stack);
        process.exit(1);
    }
}

/**
 * 计算动画边界（带填充）
 * @param {Spine} spine Spine实例
 * @param {number} padding 填充大小
 * @param {number} scale 缩放比例
 * @param {Animation} animation 动画对象
 * @returns 边界信息
 */
function calculateAnimationBounds(spine, padding, scale, animation) {
    // 临时保存当前状态
    const saveTime = spine.state.time;
    const saveX = spine.position.x;
    const saveY = spine.position.y;
    const saveScale = spine.scale.x;
    
    // 重置位置
    spine.position.set(0, 0);
    spine.scale.set(scale);
    
    const samplePoints = [
        0, 
        animation.duration * 0.25,
        animation.duration * 0.5,
        animation.duration * 0.75,
        animation.duration
    ];
    
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for (const time of samplePoints) {
        spine.state.time = time;
        spine.state.apply(spine.skeleton);
        spine.update(spine.state.time);
        spine.skeleton.updateWorldTransform();
        
        // 获取边界
        const offset = { x: 0, y: 0 };
        const size = { x: 0, y: 0 };
        spine.skeleton.getBounds(offset, size);
        
        minX = Math.min(minX, offset.x);
        minY = Math.min(minY, offset.y);
        maxX = Math.max(maxX, offset.x + size.x);
        maxY = Math.max(maxY, offset.y + size.y);
    }
    
    // 恢复状态
    spine.state.time = saveTime;
    spine.state.apply(spine.skeleton);
    spine.position.set(saveX, saveY);
    spine.scale.set(saveScale);
    
    const width = Math.ceil((maxX - minX) * scale) + padding * 2;
    const height = Math.ceil((maxY - minY) * scale) + padding * 2;
    
    return {
        width,
        height,
        minWidth: maxX - minX,
        minHeight: maxY - minY,
        minX,
        minY,
        maxX,
        maxY
    };
}

// 示例用法
if (require.main === module) {
    const config = {
        jsonPath: './assets/spineboy/spineboy.json',      // Spine JSON文件
        atlasPath: './assets/spineboy/spineboy.atlas',    // Spine atlas文件
        texturePath: './assets/spineboy/spineboy.png',    // 纹理图片
        outputDir: './output/',                           // 输出目录
        animationName: 'walk',                            // 要导出的动画名称
        fps: 24,                                          // 导出帧率
        scale: 0.8,                                       // 缩放比例
        quality: 80,                                      // 输出质量
        padding: 20,                                      // 图片边界填充
        exportPng: true,                                  // 导出PNG序列
        exportGif: true,                                  // 导出GIF动画
        exportZip: true                                   // 导出ZIP压缩包
    };

    exportSpineFrames(config);
}

module.exports = { exportSpineFrames };