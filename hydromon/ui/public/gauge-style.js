gaugeStyle = function() {
    // outer ring
    $('circle:nth-child(1)').attr('fill', '#535353');

    // inner area
    $('circle:nth-child(2)').attr('fill', '#7e7e7e');   // background
    $('circle:nth-child(2)').attr('stroke', '#1b70ff'); // glow ring

    // dial %
    // #gauge-a1 > table > tbody > tr > td > div > div:nth-child(1) > div > svg > g > text:nth-child(5)
    $('text:nth-child(5)').attr('fill', '#ffffff');

    // dial max
    // #gauge-a1 > table > tbody > tr > td > div > div:nth-child(1) > div > svg > g > text:nth-child(7)
    $('text:nth-child(7)').attr('fill', '#ffffff');
    // dial min
    // #gauge-a1 > table > tbody > tr > td > div > div:nth-child(1) > div > svg > g > text:nth-child(6)
    $('text:nth-child(6)').attr('fill', '#ffffff');

    // ticks
    $('path:nth-child(8)').attr('stroke', '#1b70ff');
    $('path:nth-child(9)').attr('stroke', '#1b70ff');

    // arrow
    $('div:nth-child(1) > div > svg > g > g > circle').attr('fill', '#242424'); // arrow mid circle
    $('div:nth-child(1) > div > svg > g > g > path').attr('fill', '#ffffff');   // arrow
    $('div:nth-child(1) > div > svg > g > g > path').attr('stroke', '#ffffff');   // arrow
    $('div:nth-child(1) > div > svg > g > g > text').attr('fill', '#242424');   // bottom text
}

var barStyle = 'stroke-color: #1b70ff; stroke-width: 2; fill-color: #293855';