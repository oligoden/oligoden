function d(i,p) {
    var d = "m "+(p[0][0]+i*p[0][2]).toFixed(2)+","+(p[0][1]+i*p[0][3]).toFixed(2)+" T";
    for (j = 1;j < p.length;j++) {
        d += " "+(p[j][0]+i*p[j][2]).toFixed(2)+","+(p[j][1]+i*p[j][3]).toFixed(2);
    }
    return d;
}
function bgdraw(bg,p) {
    var paths = bg.children, iPath = 0;
    var m = 5;
    if (paths.length < (m*2+1)) {
        while (bg.firstChild) {bg.removeChild(bg.firstChild);}
        var svgNS = "http://www.w3.org/2000/svg";
        for (var i = 0; i < (m*2+1); i++) {
            var path = document.createElementNS(svgNS, "path");
            if (i == 0 || i == 2*m) {path.setAttribute("class","ax-bgcurve ax-edge-stroke");}
            else if (i == 3) {path.setAttribute("class","ax-bgcurve ax-red-stroke");}
            else {path.setAttribute("class","ax-bgcurve");}
            bg.appendChild(path);
        }
        paths = bg.children;
    }
    for (var i = -m; i <= m; i++) {
        paths[iPath].setAttribute("d",d(i,p));
        iPath++;
    }
}
function bganim(bg,p,m,lim,t) {
    if (rapid) {
        rapid = false;
        m = [];
        const s = Math.floor(Math.random() * 30 + 100);
        for (let k = 0; k < lim.length; k++) {
            for (let l = 0; l < 4; l++) {
                const x = (Math.random() * (lim[k][l][1]-lim[k][l][0])) + lim[k][l][0];
                const y = (x-p[k][l])/s;
                const a = (-6*y)/(s*s);
                const b = -a*s;
                m.push([s,a,b,k,l]);
            }
        }
    }

    bgdraw(bg,p);
    //p[0][1] = 90 + 60*Math.sin(t);
    for (var i = 0; i < m.length; i++) {
        p[m[i][3]][m[i][4]] += m[i][1]*m[i][0]*m[i][0] + m[i][2]*m[i][0];
        if (m[i][0] == 0) {m.splice(i, 1);}
        else {m[i][0]--}
    }

    if (m.length == 0) {
        const k = Math.floor(Math.random() * 5);
        const l = Math.floor(Math.random() * 4);
        const x = (Math.random() * (lim[k][l][1]-lim[k][l][0])) + lim[k][l][0];
        const s = Math.floor(Math.random() * 3000 + 300);
        const y = (x-p[k][l])/s;
        const a = (-6*y)/(s*s);
        const b = -a*s;
        m.push([s,a,b,k,l])
        rrate = 20;
    }
    window.setTimeout(function() {bganim(bg,p,m,lim,t);}, rrate);
}
function setup() {
    const bg = document.getElementById("bg");
    bg.setAttribute("height",window.innerHeight);

    const limits = [
        [[-150, -50],[0,360],[-10,10],[-30,30]],
        [[  50, 450],[0,360],[-20,20],[-30,30]],
        [[ 300, 700],[0,360],[-20,20],[-30,30]],
        [[ 550, 950],[0,360],[-20,20],[-30,30]],
        [[1050,1150],[0,360],[-10,10],[-30,30]]
    ]
    const motion = [];
    let points = [];
    for (let k = 0; k < limits.length; k++) {
        points.push([]);
        for (let l = 0; l < 4; l++) {
            points[k].push((Math.random() * (limits[k][l][1]-limits[k][l][0])) + limits[k][l][0]);
        }
    }
    bganim(bg,points,motion,limits,0);
}
let rapid = false;
let rrate = 20;
window.onclick = function() {rapid = true;rrate = 1;};
// window.onscroll = function() {scrolling()};
// function scrolling() {
//     var sh = document.getElementById("content").offsetHeight;
//     var ih = window.innerHeight;
//     if (document.body.scrollTop > sh-ih-100 || document.documentElement.scrollTop > sh-ih-100) {
//         document.getElementById("footer").classList.remove("faded");
//     } else {
//         document.getElementById("footer").classList.add("faded");
//     }
// }
function adjust() {
    var bg = document.getElementById("bg");
    bg.setAttribute("height",window.innerHeight);
    // var nv = document.getElementById("nav");
    // if (nv.className.indexOf("navicon") >= 0) {
    //     nv.className = nv.className.replace(" navicon", "");
    // }
}
// function navSmallToggle() {
//     var nv = document.getElementById("nav");
//     if (nv.className.indexOf("navicon") == -1) {
//         nv.className += " navicon";
//     } else {
//         nv.className = nv.className.replace(" navicon", "");
//     }
// }