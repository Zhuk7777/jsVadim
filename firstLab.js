document.getElementById('upper-form').addEventListener("submit",checkUpperForm);
document.getElementById('bottom-form').addEventListener("submit",checkBottomForm);
let size=0;

function checkUpperForm(event)
{
    event.preventDefault();
    size=document.getElementById('upper-form').dimension.value;
    if(size=="")
        document.getElementById('error').innerHTML="Заполните поле";
    else
    {
         document.getElementById('error').innerHTML="";
    }

    let htmlText=""

    for(let i=0;i<size;i++)
    {
        htmlText+='<div class="lines">'
        for(let j=0;j<size;j++)
        {
            htmlText+='<input type="text" class="cell" name="cell" value="0">'
        }

        htmlText+='</div>'
    }

    document.getElementById('matrix').setHTML(htmlText)
    document.getElementById('graph').innerHTML=""

}

function checkBottomForm(event)
{
    event.preventDefault();
    document.getElementById('graph').innerHTML=""
    elements=[];
    elements=document.getElementsByClassName('cell')

    

    let matrix=[];
    for(let i=0;i<size;i++)
        matrix[i]=[];

    let elemIndex=0;
    for(let i=0;i<size;i++)
        for(let j=0;j<size;j++)
        {
            matrix[i][j]=elements[elemIndex].value
            elemIndex+=1
        }
    console.log(matrix);

    let nodes = []

    for (let i=0; i<matrix.length; i++)
    nodes.push(({id: i+1}));

    let links = []
    for (let i=0; i<matrix.length; i++)
    for (let j=i+1; j<matrix[0].length; j++)
    if (matrix[i][j] == 1)
    links.push(({source: i, target: j}));

    const svg = d3.select('#graph')
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const centerX = width / 2;
    const centerY = height / 2;

    

    const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-700))
    .force('link', d3.forceLink(links))
    .force('center', d3.forceCenter(centerX, centerY));

    const circles = svg.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 5)
    .style("fill-opacity", 0.7)
    .style('fill', 'white');

    const lines = svg.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .style("stroke-opacity", 0.8)
    .attr('stroke', 'white');

    const text = svg.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .style("writing-width", 5)
    .style('fill', '#67bbf3')
    .text(node => node.id);

    simulation.on('tick', () => {
    circles.attr('cx', (node) => node.x)
    .attr('cy', (node) => node.y);
    text.attr('x', (node) => node.x)
    .attr('y', (node) => node.y);
    lines.attr('x1', link => link.source.x)
    .attr('y1', link => link.source.y)
    .attr('x2', link => link.target.x)
    .attr('y2', link => link.target.y);
    }
    )

}

