/**输入文本 */
const dom_inputText = document.getElementById('input');
/**输出文本 */
const dom_outputText = document.getElementById('output');
/**运行按钮 */
const dom_runButton = document.getElementById('run');

const gui = {
    /**
     * 关联gui
     */
    launch: (func, inputObj, ref) => {
        this.func = func;
        this.inputObj = inputObj;
        this.ref = ref;

        dom_inputText.textContent = gui.encodeString(this.inputObj);
    },

    /**
     * 输入参数转文本
     */
    encodeString: (inputObj) => {
        let inputString = JSON.stringify(inputObj);

        inputString = inputString.replace('{', '{\n  ');
        inputString = inputString.replace(',', ',\n  ');
        inputString = inputString.replace('}', '\n}');

        return inputString;
    },

    /**
     * 输入文本转参数
     */
    decodeString: (inputString) => {
        let str = inputString.replace('\n  ', '');
        str = str.replace('\n', '');
        
        let intputObj = null;

        try {
            intputObj = eval("(" + str + ")");
        } catch {
            alert('please check your input 🐟')
        }

        return intputObj;
    },

    /**
     * 点击运行
     */
    run: () => {
        const inputObj = gui.decodeString(dom_inputText.value);

        this.func.call(this.ref, inputObj);
    },

    /**
     * 打印结果
     */
    result: (resultObj) => {
        dom_outputText.textContent = JSON.stringify(resultObj);
    }
};

dom_runButton.onclick = gui.run.bind(this);

/**
 * 兼容tab键
 */
const tab = () => {
    if (event.keyCode == 9) {
        event.preventDefault();

        let start = this.selectionStart;
        let end = this.selectionEnd;
        if (start === end) {
            document.execCommand('insertText', false, "  ");
        } else {
            let strBefore = this.value.slice(0, start);
            let curLineStart = strBefore.includes('\n') ? strBefore.lastIndexOf('\n') + 1 : 0;
            let strBetween = this.value.slice(curLineStart, end + 1);
            let newStr = "  " + strBetween.replace(/\n/g, '\n  ');
            let lineBreakCount = strBetween.split('\n').length;
            let newStart = start + 2;
            let newEnd = end + (lineBreakCount + 1) * 2;

            this.setSelectionRange(curLineStart, end);
            document.execCommand("insertText", false, newStr);
            this.setSelectionRange(newStart, newEnd);
        }
    }
}