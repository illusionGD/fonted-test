import XLSX from 'xlsx'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
/**
 * 将 Excel 文件转换为 JSON 对象数组
 * @param {string} filePath - Excel 文件路径
 * @param {string[]} keys - 自定义键名数组
 * @param {Object} [options] - 配置选项
 * @param {number} [options.keyCol=0] - key的列数 (默认0)
 * @param {number} [options.startCol=0] - 起始列索引 (从0开始)
 * @param {number} [options.endCol=0] -  N 列结束 (默认8)
 * @param {number} [options.startRow=0] - 起始行索引 (从0开始)
 * @returns {Object[]} JSON 数据数组
 */
function excelToJson(filePath, options = {}) {
    // 合并默认配置
    const {
        startCol = 0,
        startRow = 0,
        headerList = [],
        endCol = 8,
        keyCol = 0,
    } = options

    // 读取 Excel 文件
    const workbook = XLSX.readFile(filePath)

    // 获取工作表
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    // 转换为行数据数组
    const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // 生成二维数组
        defval: '',
        blankrows: true, // 跳过空行
    })

    // 如果没传head，默认第一行为header
    if (!headerList || !headerList.length) {
        rows.slice(0, 1).forEach((row, idx) => {
            for (let index = startCol; index < startCol + endCol; index++) {
                const col = row[index]
                headerList.push(col)
            }
        })
    }

    const result = []

    rows.slice(startRow).forEach((row, idx) => {
        for (let index = 0; index < endCol - startCol; index++) {
            const col = row[index + startCol]

            const obj = result[index] || {}
            result[index] = obj

            const key = row[keyCol || 0].trim()
            if (key && col) {
                obj[key] = col
            }
        }
    })

    return {result, headerList}
}

function processExcelToJson(xlsxPath, outDir, options) {
    const {result, headerList} = excelToJson(xlsxPath, options)
    if (!existsSync(outDir)) {
        mkdirSync(outDir)
    }
    const other = options.other || {}
    result.forEach((item, index) => {
        const lang = (options.headerList || headerList)[index]
        const filePath = `${outDir}/${lang}.json`
        writeFileSync(filePath, JSON.stringify(item))

        const file = readFileSync(filePath, 'utf-8')
        const json = JSON.parse(file)
        // 补充其他数据
        Object.assign(json, other[lang] || {})

        // 处理换行
        writeFileSync(
            filePath,
            JSON.stringify(json).replace(/(\\r)?\\n/g, '<br/>')
        )
    })
}

processExcelToJson('./Aki-2.6版本回归邀约H5本地化内容.xlsx', './data', {
    keyCol: 2, // key的列数
    startCol: 3, // 从 N 列开始
    endCol: 11, //  N 列结束
    startRow: 1, // 跳过前1行
    headerList: ['zh-hans', 'zh-hant', 'en', 'ja', 'ko', 'fr', 'de', 'es'], 
    // 其他补充数据
    other: {
        'zh-hans': {
            saveTip1: '長按圖片保存',
            saveTip2: '右鍵保存圖片',
        },
        'zh-hant': {
            saveTip1: '長按圖片保存',
            saveTip2: '右鍵保存圖片',
        },
        ko: {
            saveTip1: '길게 눌러 저장하기',
            saveTip2: '우클릭으로 이미지를 저장',
        },
        ja: {
            saveTip1: '画像を長押しで保存',
            saveTip2: '右クリックで画像を保存する',
        },
        fr: {
            saveTip1: 'Maintenir appuyé pour sauvegarder',
            saveTip2: "Clic droit pour sauvegarder l'image",
        },
        es: {
            saveTip1: 'Mantén pulsado para guardar',
            saveTip2: 'Haz clic derecho para guardar',
        },
        en: {
            saveTip1: 'Press and hold to save',
            saveTip2: 'Right-click to save',
        },
        de: {
            saveTip1: 'Halte gedrückt, um zu speichern',
            saveTip2: 'Speichere das Bild mit einem Rechtsklick',
        },
    }
})
