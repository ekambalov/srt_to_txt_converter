import { parseSRTtoText } from './srtParser';
import copyIconUrl from '../img/copy-link-icon.svg';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('srtFile');
    const textInput = document.getElementById('textInput');
    const output = document.getElementById('output');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Устаўляем SVG унутр кнопкі
    copyBtn.innerHTML = `<img src="${copyIconUrl}" alt="Капіраваць" class="copy-icon">`;

    // Схоўваем кнопку на пачатку
    copyBtn.classList.remove('visible');

    convertBtn.addEventListener('click', () => {
        let result = '';
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                result = parseSRTtoText(e.target.result);
                finalize(result);
            };
            reader.readAsText(fileInput.files[0]);
        } else if (textInput.value.trim()) {
            result = parseSRTtoText(textInput.value);
            finalize(result);
        } else {
            output.textContent = 'Увядзіце тэкст або загрузіце файл.';
            copyBtn.classList.remove('visible');
        }
    });

    function finalize(result) {
        output.textContent = result;
        textInput.value = '';
        fileInput.value = '';
        copyBtn.classList.add('visible');
    }

    copyBtn.addEventListener('click', async () => {
        const text = output.textContent;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }

        const orig = copyBtn.innerHTML;
        copyBtn.textContent = 'Скапіявана!';
        setTimeout(() => {
            copyBtn.innerHTML = orig;
        }, 3000);
    });
});
