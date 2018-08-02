import * as $ from 'jquery';

export function GoogleGaugeStyleDark() {

    console.log("Setting up style using JQuery");
    
    // outer ring
    $('circle:nth-child(1)').attr('fill', '#535353');

    // inner area
    $('circle:nth-child(2)').attr('fill', '#7e7e7e');   // change background

    // glow ring
    $('circle:nth-child(2)').attr('stroke', '#1b70ff');

    // dial, center text
    $('text:nth-child(3)').attr('fill', '#1f1f1f');

    // dial, text when red/yellow/green marker values are not set
    $('text:nth-child(4)').attr('fill', '#1f1f1f'); // min text
    $('text:nth-child(5)').attr('fill', '#1f1f1f'); // max text
    $('div:nth-child(1) > div > svg > g > g > text').attr('fill', '#1f1f1f');   // bottom text

    // ticks
    $('path:nth-child(6)').attr('stroke', '#1b70ff');
    $('path:nth-child(7)').attr('stroke', '#1b70ff');

    // ticks when color markers are used
    $('path:nth-child(8)').attr('stroke', '#1b70ff');   // major ticks
    $('path:nth-child(9)').attr('stroke', '#1b70ff');   // major ticks

    // arrow
    $('div:nth-child(1) > div > svg > g > g > circle').attr('fill', '#242424'); // arrow mid circle
    $('div:nth-child(1) > div > svg > g > g > path').attr('fill', '#ffffff');   // arrow
    $('div:nth-child(1) > div > svg > g > g > path').attr('stroke', '#ffffff');   // arrow
}