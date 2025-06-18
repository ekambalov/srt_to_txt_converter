import { parseSRTtoText } from './srtParser';
import './style.css';

const fileInput = document.getElementById('srtFile');
const textInput = document.getElementById('textInput');
const output = document.getElementById('output');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');

// Спачатку хаваем кнопку "Капіраваць"
copyBtn.style.display = 'none';

convertBtn.addEventListener('click', () => {
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = parseSRTtoText(e.target.result);
            output.textContent = result;

            textInput.value = '';
            fileInput.value = '';

            copyBtn.style.display = 'inline-block';
        };
        reader.readAsText(fileInput.files[0]);

    } else if (textInput.value.trim()) {
        const result = parseSRTtoText(textInput.value);
        output.textContent = result;

        textInput.value = '';
        fileInput.value = '';

        copyBtn.style.display = 'inline-block';
    } else {
        output.textContent = 'Увядзіце тэкст або загрузіце файл.';
        copyBtn.style.display = 'none';
    }
});

copyBtn.addEventListener('click', async () => {
    const text = output.textContent;
    if (!text) {
        alert('Няма тэксту для капіявання.');
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            alert('Тэкст скапіяваны ў буфер 😊');
        } catch {
            fallbackCopy(text);
        }
    } else {
        fallbackCopy(text);
    }
});

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        alert('Тэкст скапіяваны ў буфер 😊');
    } catch {
        alert('Капіраванне не атрымалася');
    }
    document.body.removeChild(ta);
}
