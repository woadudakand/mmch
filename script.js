window.addEventListener('load', () => {
    const target = document.querySelectorAll('circle[id^="w--"]');
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const direction = document.getElementById('direction');

    let options = '<option value="">Select</option>';
    target.forEach(element => {
        const id = element.getAttribute('id');
        options += `<option value="${id}">${id}</option>`
    });
    
    from.innerHTML = options;    
    to.innerHTML = options;    

    let path = '';
    let fromX = '';
    let fromY = '';
    let toX = '';
    let toY = '';
    from.addEventListener('change', (event) => {
        const fromId = document.getElementById(event.target.value);
        const translate = fromId.getAttribute('transform').split(') ')[0].split(')')[0].split('(')[1];
        const translateX = translate.split(' ')[0];
        const translateY = translate.split(' ')[1];
        fromX = translateX;
        fromY = translateY;
        path += `M${translateX},${translateY}`;        
    });
    
    to.addEventListener('change', (event) => {
        const toId = document.getElementById(event.target.value);
        const translate = toId.getAttribute('transform').split(') ')[0].split(')')[0].split('(')[1];
        const translateX = translate.split(' ')[0];
        const translateY = translate.split(' ')[1];
        toX = translateX;
        toY = translateY;
        
        if(fromX == toX || fromY == toY){
            path += `H${translateX}V${translateY}`; 
            direction.setAttribute('d', path);
            // path = '';
        } else {
            // console.log("{"+fromX, fromY+"}", "{"+toX, toY+"}"); 
            const turns = document.querySelectorAll('circle[id^="t-"]');
            turns.forEach(turn => {
                const turnTranslate = turn.getAttribute('transform').split(') ')[0].split(')')[0].split('(')[1];
                
                if(turnTranslate == fromX + " " + toY || turnTranslate == toX+" "+fromY){
                    const turnTranslateX = turnTranslate.split(' ')[0];
                    const turnTranslateY = turnTranslate.split(' ')[1];
                    path += `H${turnTranslateX}V${turnTranslateY}H${translateX}V${translateY}`;
                    direction.setAttribute('d', path);
                } else {
                    console.log(turnTranslate);
                }
            })

        }
    });

})