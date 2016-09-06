// RED var stroke_particle = '#AD2C4E';
var stroke_particle_ulcc = 'red';
var stroke_particle_suezmax = 'blue';

var stroke_particle = 'navy';

var color_particles = true;

var show_labels = true;

// Width of the flow lines
var particle_displacement = 5;

// Particle density
var FREQUENCY_INTERVAL = 0.5;

var SPEED_VALUE = 0.5;
var SPEED_SLOW_FACTOR = 0.15;
var SPEED_RANDOM_FACTOR = 0.5;

var steady_speed = false;

var margin = { top: 1, right: 1, bottom: 6, left: 1 };

var dimensions = {
    width: 1100 - margin.left - margin.right,
    height: 600 - margin.top - margin.bottom
};


var formatNumber = d3.format(",.0f"),
    format = function (d) {
        return formatNumber(d) + " TWh";
    },
    color = d3.scale.category20();

var svg = d3.select("svg")
    .attr("width", dimensions.width + margin.left + margin.right)
    .attr("height", dimensions.height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    })
    .interpolate("monotone");

var origin = { "x": 121, "y": 127 };

var almost_not_treated_color = '#556B2F';
var just_aireated_color = '#6B8E23';
var first_pass_intermediate_clean_color = '#8FBC8F';
var first_pass_clean_color = 'teal';
var half_clean_color = '#4682B4';
var pure_clean_color = '#2FA6C7';
var dirty_color = '#8B4513';
var biosolids_color = 'brown';

var lineData = [
    // From Aeration tank
    {
        data: {
            freq: 1,
            color: just_aireated_color,
        },
        points: [
            { "x": 909, "y": 136 },
            { "x": 990, "y": 136 },
            { "x": 1003, "y": 152 },
            { "x": 1003, "y": 255 }
        ],
    },

    // From Settling tank
    {
        data: {
            freq: 1,
            color: almost_not_treated_color,
        },
        points: [
            { "x": 625, "y": 135 },
            { "x": 715, "y": 135 }
        ],
    },


    // From solids thickening/clarifiers to ultraviolet
    {
        data: {
            freq: 0.25,
            color: first_pass_clean_color,
        },
        points: [
            { "x": 856, "y": 301 },
            { "x": 740, "y": 301 }
        ],
    },
    // Loop within solids thickening
    {
        data: {
            freq: 0.1,
            color: first_pass_clean_color,
            displacement: 5,
            no_displace_x: true,
        },
        points: [
            {x:958, y:317}, 
            {x:952, y:318}, 
            {x:948, y:321}, 
            {x:940, y:331}, 
            {x:940, y:335}, 
            {x:947, y:344}, 
            {x:955, y:348}, 
            {x:985, y:349}, 
            {x:989, y:343}, 
            {x:996, y:337}, 
            {x:996, y:330}, 
            {x:994, y:324}, 
            {x:980, y:318}, 
            {x:971, y:318}
    ]},
      {
        data: {
            freq: 0.1,
            color: first_pass_clean_color,
            displacement: 5,
            no_displace_x: true
        },
        points: [
            {x:895, y:281}, 
            {x:888, y:281}, 
            {x:878, y:289}, 
            {x:881, y:298}, 
            {x:889, y:305}, 
            {x:901, y:308}, 
            {x:913, y:308}, 
            {x:917, y:306}, 
            {x:928, y:304}, 
            {x:934, y:298}, 
            {x:934, y:291}, 
            {x:928, y:284}, 
            {x:919, y:283}, 
            {x:909, y:279},
    ]},
    {
          data: {
            freq: 0.1,
            color: first_pass_intermediate_clean_color,
            displacement: 4,
            no_displace_x: true,
        },
        points: [
            {x:987, y:266}, 
            {x:977, y:268}, 
            {x:971, y:276}, 
            {x:981, y:288}, 
            {x:1005, y:293}, 
            {x:1024, y:287}, 
            {x:1030, y:276}, 
            {x:1021, y:268}, 
            {x:1003, y:263}, 
    ]},

    // From ultraviolet to filtration
    {
        data: {
            freq: 0.25,
            color: half_clean_color,
        },
        points: [
            { "x": 627, "y": 302 },
            { "x": 444, "y": 303 }
        ],
    },


    //
    // PURE CLEAN
    //
    {
        data: {
            freq: 0.1,
            color: pure_clean_color,
        },
        points: [
            { "x": 340, "y": 303 },
            { "x": 223, "y": 303 },
            { "x": 205, "y": 319 },
            { "x": 205, "y": 454 },
        ],
    },

    {
        data: {
            freq: 0.4,
            color: pure_clean_color,
        },
        points: [
            {x:342, y:303},
            {x:142, y:303},
            {x:111, y:310},
            {x:111, y:356}
        ],
    },


    //
    // DIRTY
    // 

    //
    // FROM CITY CONSUMPTION
    //
    {
        data: {
            freq: 1,
            color: dirty_color,
        },
        points: [
            {x:188, y:193}, 
            {x:210, y:193}, 
        ],
    },
     {
        data: {
            freq: 1,
            color: dirty_color,

        },
        points: [
            {x:28, y:193}, 
            {x:60, y:193}
        ],
    },
     {
        data: {
            freq: 1,
            color: dirty_color,

        },
        points: [
            {x:164, y:150}, 
            {x:164, y:165},
        ],
    },
    {
        data: {
            freq: 1,
            color: dirty_color,
        },
        points: [
            { "x": 63, "y": 150 },
            { "x": 68, "y": 193 },
            { "x": 131, "y": 193 }
        ],
    },
    {
        data: {
            freq: 1,
            color: dirty_color,
        },
        points: [
            { "x": 104, "y": 150 },
            { "x": 106, "y": 193 },
            { "x": 131, "y": 193 }
        ],
    },
    {
        data: {
            freq: 1,
            color: dirty_color,
        },
        points: [
            { "x": 212, "y": 150 },
            { "x": 219, "y": 193 },
            { "x": 305, "y": 195 }
        ],
    },
    {
        data: {
            freq: 1,
            color: dirty_color,
        },
        points: [
            { "x": 138, "y": 203 },
            { "x": 177, "y": 203 }
        ],
    },



    // From Bar Screening
    {
        data: {
            freq: 0.5,
            color: dirty_color,
        },
        points: [
            { "x": 428, "y": 135 },
            { "x": 475, "y": 135 },
        ],
    },


    // From solids thikening
    {
        data: {
            freq: 0.05,
            color: dirty_color,
        },
        points: [
            {x:971, y:384},
            {x:971, y:406}, 
            {x:950, y:415}, 
            {x:829, y:415}, 
        ],
    },

    // From settling tank
   
    {
        data: {
            freq: 0.25,
            color: dirty_color,
        },
        points: [
            { "x": 529, "y": 220 },
            { "x": 529, "y": 284 },
        ],
    },
    {
        data: {
            freq: 0.25,
            color: dirty_color,
        },
        points: [
            { "x": 529, "y": 316 },
            { "x": 530, "y": 408 },
            { "x": 555, "y": 415 },
            { "x": 685, "y": 415 },
        ],
    },

    //
    // BIOSOLIDS
    //
 
    // Digestion process
    {
        data: {
            freq: 0.25,
            color: biosolids_color,
            displacement: 45,
            no_displace_x: true,
        },
        points: [
            { "x": 760, "y": 430 },
            { "x": 783, "y": 434 },
            { "x": 808, "y": 430 },
            { "x": 783, "y": 434 },
            { "x": 760, "y": 430 },
            { "x": 783, "y": 434 },
            { "x": 808, "y": 430 },
        ],
    },




    {
        data: {
            dest: '',
            freq: 0.1,
            color: biosolids_color,
        },
        points: [
            { x: 786, y: 482 },
            { x: 784, y: 494 },
            { x: 764, y: 505 },
            { x: 629, y: 507 },
        ],
    },

];



for (var i = lineData.length - 1; i >= 0; i--) {
    var current = lineData[i];
    var path = svg.append("path")
        .attr('color', current.data.color)
        .attr('freq', current.data.freq)
        .attr('displacement', current.data.displacement)
        .attr('no_displace_x', current.data.no_displace_x)
        .classed('link', true)
        .attr("d", lineFunction(current.points))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
};

//Get path start point for placing marker
function pathStartPoint(path) {
    var d = path.attr("d"),
        dsplitted = d.split(" ");
    return dsplitted[1].split(",");
}

function transition() {
    marker.transition()
        .duration(7500)
        .attrTween("transform", translateAlong(path.node()))
        .each("end", transition); // infinite loop
}

function translateAlong(path) {
    var l = path.getTotalLength();
    return function (i) {
        return function (t) {
            var p = path.getPointAtLength(t * l);
            return "translate(" + p.x + "," + p.y + ")";//Move marker
        }
    }
}

var t = d3.timer(tick, 1000);
var particles = [];

var canvas = d3.select("canvas").node();
var context = d3.select("canvas").node().getContext("2d")

context.clearRect(0, 0, 
    dimensions.width + margin.left + margin.right, 
    dimensions.height + margin.top + margin.bottom);

var imageObj = new Image();
imageObj.onload = function () {
    context.drawImage(this, 0, 0);
};

imageObj.src = 'flow.png';

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    d3.select('#pos').html('Pos: ' + mousePos.x + ',' + mousePos.y);
}, false);

canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    console.log('{x:' + mousePos.x + ', y:' + mousePos.y + '}, ');
}, false);

///////

function tick(elapsed, time) {

    particles = particles.filter(function (d) {
        return d.current < d.path.getTotalLength()
    });

    d3.selectAll("path.link")
        .each(
        function (d) {
            //        if (d.freq < 1) {
            for (var x = 0; x < FREQUENCY_INTERVAL; x++) {

                var frequency = d3.select(this).attr('freq');

                var displacement = d3.select(this).attr('displacement');
                var nodisplacement = d3.select(this).attr('no_displace_x');
                var offset;

                if (displacement) {
                    offset = (Math.random() * displacement - .5 * 3);
                }  else {
                    offset = (Math.random() * particle_displacement - .5 * 3);
                }

                // Speed not relative
                var speed = SPEED_VALUE + (Math.random() * SPEED_RANDOM_FACTOR);

                if (steady_speed) {
                    speed = SPEED_VALUE;
                }

                // Speed relative to the volume

                if (Math.random() < frequency * 2) {
                    var length = this.getTotalLength();
                    var item = {
                        time: elapsed,
                        offset: offset,
                        path: this,
                        length: length,
                        animateTime: length,
                        speed: speed,
                        no_displace_x: nodisplacement
                    };

                    item.color = d3.select(this).attr('color');

                    particles.push(item);
                }
                
            }

        });

    particleEdgeCanvasPath(elapsed);
}

function particleEdgeCanvasPath(elapsed) {

    var context = d3.select("canvas").node().getContext("2d")

    context.clearRect(0, 0, dimensions.width, dimensions.height);

    context.drawImage(imageObj, 0, 0);

    for (var x in particles) {

        var currentTime = elapsed - particles[x].time;
        particles[x].current = currentTime * SPEED_SLOW_FACTOR * particles[x].speed;
        var currentPos = particles[x].path.getPointAtLength(particles[x].current);

        context.beginPath();
        context.fillStyle = particles[x].color;

        var rand = Math.ceil(Math.random() * 1000);

        context.fillStyle = particles[x].color;

        var displace_x = particles[x].offset;

        if (particles[x].no_displace_x) {
            displace_x = 0;
        }
        context.arc(
            currentPos.x + displace_x,
            currentPos.y + particles[x].offset,
            1,
            0,
            2 * Math.PI
        );
        context.fill();
    }

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
