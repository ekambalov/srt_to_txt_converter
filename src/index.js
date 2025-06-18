import { parseSRTtoText } from './srtParser';
import './style.css';

const fileInput = document.getElementById('srtFile');
const textInput = document.getElementById('textInput');
const output = document.getElementById('output');
const convertBtn = document.getElementById('convertBtn');

convertBtn.addEventListener('click', () => {
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const result = parseSRTtoText(e.target.result);
            output.textContent = result;
        };
        reader.readAsText(fileInput.files[0]);
    } else if (textInput.value.trim()) {
        const result = parseSRTtoText(textInput.value);
        output.textContent = result;
    } else {
        output.textContent = 'Увядзіце тэкст або загрузіце файл.';
    }
});
