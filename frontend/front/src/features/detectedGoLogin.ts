// export const detectGoLogin = () => {
//
//     return {isAD:false, comment:"test"}
// }

type res = {
    isAD: number;
    comment: string [];
}


//не совпадение user.agent.data с user.agent
//✔device: Windows 10 (64-bit)
// ✖platform: MacIntel
//canvas надо тоже сделать по хорошему


async function checkMediaDev(){
    const res: res = {isAD:0, comment: []};
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        res.isAD +=1;
        res.comment.push('media not supported');
        return res;
    }

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        if (devices.length < 2){
            res.isAD += 1;
            res.comment.push('мало девайсов подозрительно')
            //сделать вывод что плохо это
            return res;
        }
    } catch (error) {
        res.isAD += 1;
        res.comment.push('media error');
    }
    finally {
        console.log("detectedGoLogin");
    }
    return res;  
}


function checkWebGL(){
    const res: res = {isAD:0, comment: []};
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl){
        res.isAD += 1;
        res.comment.push('webgl not supported');
    }
    return res;
}

function checkAgent(){
    const res: res = {isAD:0, comment: []};
    const ua = navigator.userAgent;

    if (navigator.language && navigator.languages[0] !== navigator.language ){
        res.isAD += 1;
        res.comment.push('diff languages //подозрительно//');
    }
    if (navigator.webdriver) {
        res.isAD += 1;
        res.comment.push('webdriver detected');
    }

    if (navigator.plugins.length === 0) {
        res.isAD += 1;
        res.comment.push('plugins empty //подозрительно//');
    }
    if ((navigator as any).connection && (navigator as any).connection.rtt === 0) {
        res.isAD += 1;
        res.comment.push('rtt = 0 //подозрительно');
    }

    return res;
}

function checkWindow(){
    const res: res = {isAD:0, comment: []};
    const {width, height} = screen;
    if (screen.availHeight> height || screen.availWidth > width){
        res.isAD += 1;
        res.comment.push('avail height/width more then height/width')
    }

    const ratio = width / height;
    const ratio2 = window.outerWidth / window.outerHeight;
    if (Math.abs(ratio - ratio2) > 0.5){
        res.isAD += 1;
        res.comment.push('ratio dont match')
    }
    return res;
}

// function checkCanvas(){

// }

export const detectGoLogin = async() => {
    // const comment: string;
    const res: res = {isAD:0, comment: []};
    const webGl = checkWebGL();
    res.comment.push(...webGl.comment);
    res.isAD += webGl.isAD;
    const agent = checkAgent();
    res.isAD += agent.isAD;
    res.comment.push(...agent.comment);
    const window = checkWindow();
    res.isAD += window.isAD;
    res.comment.push(...window.comment);
    const media = await checkMediaDev();
    res.isAD += media.isAD;
    res.comment.push(...media.comment);
    return {isAD: res.isAD > 3, comment: res.comment.join('\n')};
}