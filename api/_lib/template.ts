
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/IBMPlexMono-Medium.ttf`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'white';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'white';
    }
    return `
    @font-face {
        font-family: 'IBM Plex Mono';
        font-style:  normal;
        font-weight: 500;
        src: url(data:font/ttf;charset=utf-8;base64,${rglr}) format('ttf');
    }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 0px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'IBM Plex Mono', mono;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
    }
    .title {
        font-family: 'IBM Plex Mono', mono;
        font-size: ${sanitizeHtml('16px')};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, fontSize } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="heading">
            ${emojify(text)}
            </div>
            <div class="spacer">
            <div class="title">${emojify(sanitizeHtml('Made with 💙 by the 🦍 community'))}
            </div>
        </div>
    </body>
</html>`;
}
