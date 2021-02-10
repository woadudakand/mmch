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

    from.addEventListener('change', (event) => {
        const fromId = document.getElementById(event.target.value);
        const translate = fromId.getAttribute('transform').split(') ')[0].split(')')[0].split('(')[1];
        const translateX = translate.split(' ')[0];
        const translateY = translate.split(' ')[1];
        path += `M${translateX},${translateY}`;        
    });
    
    to.addEventListener('change', (event) => {
        const toId = document.getElementById(event.target.value);
        const translate = toId.getAttribute('transform').split(') ')[0].split(')')[0].split('(')[1];
        const translateX = translate.split(' ')[0];
        const translateY = translate.split(' ')[1];
        path += `H${translateX}V${translateY}`;   
        console.log(path);     
        direction.setAttribute('d', path);
    });

})