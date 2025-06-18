export function parseSRTtoText(srt) {
    return srt
        .replace(/\r/g, '')                            // выдаліць \r
        .split('\n')                                   // падзяліць на радкі
        .filter(line => {
            return (
                !/^\d+$/.test(line.trim()) &&              // не нумар субтытру
                !/^\d{2}:\d{2}:\d{2}[,\.]\d{3}\s-->\s\d{2}:\d{2}:\d{2}[,\.]\d{3}$/.test(line.trim())
            );
        })
        .join(' ')                                     // сабраць радкі ў адзін тэкст
        .replace(/\s{2,}/g, ' ')                       // сцераць лішнія прабелы
        .trim();
}
