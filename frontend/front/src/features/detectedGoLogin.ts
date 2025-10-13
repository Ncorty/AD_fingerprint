
import { UserAgentDataTypeGuard } from './int.ts';

type res = {
    isAD: number;
    comment: string [];
}

async function checkMediaDev(){
    const res: res = {isAD:0, comment: []};
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        res.isAD +=1;
        res.comment.push('🚫 media not supported');
        return res;
    }

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        if (devices.length < 2){
            res.isAD += 1;
            res.comment.push('🚫 There are too few media devices. Suspiciously');
            return res;
        }
    } catch (error) {
        res.isAD += 1;
        res.comment.push('🚫 media error');
    }
    finally {
        console.log("detectedGoLogin");
    }
    if (res.isAD == 0) res.comment.push('✅ media ok');

    return res;  
}


function checkWebGL(){
    const res: res = {isAD:0, comment: []};
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl){
        res.isAD += 1;
        res.comment.push('🚫 webgl not supported');
    }
    if (res.isAD == 0) res.comment.push('✅ webgl ok');
    return res;
}

function checkAgent(){
    const res: res = {isAD:0, comment: []};
    // const ua = navigator.userAgent;

    if (navigator.language && navigator.languages[0] !== navigator.language ){
        res.isAD += 1;
        res.comment.push('🚫 diff languages Suspiciously');
    }
    if (navigator.webdriver) {
        res.isAD += 1;
        res.comment.push('🚫 webdriver detected');
    }

    if (navigator.plugins.length === 0) {
        res.isAD += 1;
        res.comment.push('🚫 plugins empty Suspiciously');
    }
    if ((navigator as any).connection && (navigator as any).connection.rtt === 0) {
        res.isAD += 1;
        res.comment.push('🚫 rtt = 0 Suspiciously');
    }
    if (res.isAD == 0) res.comment.push('✅ agent without check platform ok');

    return res;
}

function checkWindow(){
    const res: res = {isAD:0, comment: []};
    const {width, height} = screen;
    if (screen.availHeight> height || screen.availWidth > width){
        res.isAD += 1;
        res.comment.push('🚫 avail height/width more then height/width')
    }

    const ratio = width / height;
    const ratio2 = window.outerWidth / window.outerHeight;
    if (Math.abs(ratio - ratio2) > 0.5){
        res.isAD += 1;
        res.comment.push('🚫 ratio dont match')
    }
    if (res.isAD == 0) res.comment.push('✅ window ok');
    return res;
}

async function checkUserAgent() {
    const res: res = {isAD: 0, comment: []};
    const ua = navigator.userAgent.toLowerCase();

    let uaOS = '';
    if (ua.includes('windows') || ua.includes('win')) {
        uaOS = 'windows';
    } else if (ua.includes('macintosh') || ua.includes('mac os')) {
        uaOS = 'macos';       
    } else if (ua.includes('linux')) {
        uaOS = 'linux';
    }

    if (UserAgentDataTypeGuard(navigator)) {
        try {
            const uaData = await navigator.userAgentData.getHighEntropyValues([
                'platform',
                'platformVersion',
                'architecture',
                'model',
                'uaFullVersion',
                'bitness',
                'fullVersionList'
            ]);

            if(uaData.platform){
                const uaDataPlatform = uaData.platform.toLowerCase();
                if (uaOS === 'windows' && !uaDataPlatform.includes('windows')) {
                    res.isAD += 1;
                    res.comment.push(`🚫 Platform diff`);
                } else if (uaOS === 'macos' && !uaDataPlatform.includes('macos') && !uaDataPlatform.includes('mac')) {
                    res.isAD += 1;
                    res.comment.push(`🚫 Platform diff`);
                } else if (uaOS === 'linux' && !uaDataPlatform.includes('linux')) {
                    res.isAD += 1;
                    res.comment.push(`🚫 Platform diff`);
                }
            }

            if (uaData.architecture) {
                const arch = uaData.architecture.toLowerCase();
                if ((ua.includes('x64') || ua.includes('win64')) && 
                    arch !== 'x86' && arch !== 'x64') {
                    res.isAD += 1;
                    res.comment.push(`🚫 Architecture diff`);
                }
            }
        } catch (error) {
            console.error('Error userAgentData:', error);
            res.comment.push('❓ userAgentData error(maybe not supported)');
        }
    } else {
        const platform = navigator.platform.toLowerCase();
        
        if (ua.includes('windows') && !platform.includes('win')) {
            res.isAD += 1;
            res.comment.push(`🚫 Platform diff`);
        } else if (ua.includes('mac') && !platform.includes('mac')) {
            res.isAD += 1;
            res.comment.push(`🚫 Platform diff`);
        } else if (ua.includes('linux') && !platform.includes('linux')) {
            res.isAD += 1;
            res.comment.push(`🚫 Platform diff`);
        }
    }
    if (res.isAD == 0) res.comment.push('✅ userAgentData ok');
    return res;
}


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

    const userAgent = await checkUserAgent();
    res.isAD += userAgent.isAD;
    res.comment.push(...userAgent.comment);

    return {isAD: res.isAD > 2, comment: res.comment.join('\n')};
}