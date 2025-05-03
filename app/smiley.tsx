// 文件：pages/smiley.js
"use client"
import { useEffect } from 'react'
import * as d3 from 'd3'

export default function Smiley() {
  useEffect(() => {
    const svgWidth = 400, svgHeight = 400
    const container = d3.select('#smileyContainer');
    container.selectAll('*').remove();

    const svg = container.append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    // 绘制笑脸背景的大圆，并保存引用到变量 face
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'faceGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    // 渐变的顶部颜色（初始为黄色）
    const topStop = gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FFD321');

    // 渐变的底部颜色（固定为黄色）
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#FFD321');

    // 绘制笑脸的大圆，填充使用定义的渐变
    const face = svg.append('circle')
      .attr('cx', svgWidth / 2)
      .attr('cy', svgHeight / 2)
      .attr('r', 180)
      .attr('fill', 'url(#faceGradient)')
      .attr('stroke', 'black')
      .attr('stroke-width', 0);
    
    // 眼睛参数
    const eyeRadius = 40;      // 眼白半径
    const pupilRadius = 20;    // 瞳孔半径
    const maxOffset = eyeRadius - pupilRadius - 2; // 瞳孔最大偏移量，留出边距

    // 左眼中心坐标
    const leftEyeCenter = { x: svgWidth / 2 - 55, y: svgHeight / 2 - 35 };
    // 右眼中心坐标
    const rightEyeCenter = { x: svgWidth / 2 + 55, y: svgHeight / 2 - 35 };

    // 绘制左眼眼白
    svg.append('circle')
      .attr('cx', leftEyeCenter.x)
      .attr('cy', leftEyeCenter.y)
      .attr('r', eyeRadius)
      .attr('fill', 'white');

    // 绘制右眼眼白
    svg.append('circle')
      .attr('cx', rightEyeCenter.x)
      .attr('cy', rightEyeCenter.y)
      .attr('r', eyeRadius)
      .attr('fill', 'white');

    // 绘制左眼瞳孔
    const leftPupil = svg.append('circle')
      .attr('cx', leftEyeCenter.x + pupilRadius/1.5)
      .attr('cy', leftEyeCenter.y - pupilRadius/1.5)
      .attr('r', pupilRadius)
      .attr('fill', 'black');

    // 绘制右眼瞳孔
    const rightPupil = svg.append('circle')
      .attr('cx', rightEyeCenter.x - pupilRadius/1.5)
      .attr('cy', rightEyeCenter.y + pupilRadius/1.5)
      .attr('r', pupilRadius)
      .attr('fill', 'black');

    const mouthRadius = 80;
    const mouthWidth = mouthRadius * 2;  // 总宽度
    const mouthHeight = mouthRadius; // 总高度
    const mouthCenter = { x: svgWidth / 2, y: svgHeight / 2 + 25 };
    const clipPath = svg.append("defs")
      .append("clipPath")
        .attr("id", "mouthClip");
      clipPath.append("path")
      .attr("transform", `translate(${mouthCenter.x}, ${mouthCenter.y})`);
      
    const mouth = svg.append('path')
      .attr('fill', '#C94343')
      .attr("transform", `translate(${mouthCenter.x}, ${mouthCenter.y})`);
    // 独立路径生成函数
    function generateMouthPath(t: number) {
      const upperLineRatio = t;
      const lowerLineRatio = 1 - t;

      const upperArcWidth = mouthRadius * (1 - upperLineRatio);
      const lowerArcWidth = mouthRadius * (1 - lowerLineRatio);
      const pathData = 
        // 起点：上边左顶点
        `M 0,0` +

        // 上边直线
        `H ${upperArcWidth}` +
        
        `A ${mouthRadius - upperArcWidth} ${mouthRadius - upperArcWidth} 0 0 1 ${mouthHeight},${mouthHeight - upperArcWidth}` +
        
        // 下边右四分之一圆（右下角）
        `A ${upperArcWidth} ${upperArcWidth} 0 0 1 ${mouthHeight - upperArcWidth},${mouthHeight}` +
        
        // 下边直线
        `H ${-lowerArcWidth}` +
        
        // 下边左四分之一圆（左下角）
        `A ${upperArcWidth} ${upperArcWidth} 0 0 1 ${-mouthHeight},${mouthHeight - upperArcWidth}` +
        
        // 闭合路径（左边上四分之一圆）
        `A ${mouthRadius - upperArcWidth} ${mouthRadius - upperArcWidth} 0 0 1 ${-upperArcWidth},0` +
        `H ${upperArcWidth}` +
        `Z`;
      // 修正坐标计算
      return pathData;
    }
    // 初始状态 (t=0.1)
    mouth.attr("d", generateMouthPath(0.1));

    // 鼠标移动事件，根据鼠标横向位置动态修改圆的填充颜色
    // 鼠标移动事件，根据鼠标位置更新瞳孔位置
    // 鼠标移动事件处理函数
    svg.on('mousemove', (event) => {
      const [mouseX, mouseY] = d3.pointer(event);

      // 更新左眼瞳孔位置
      updatePupilPosition(leftEyeCenter, leftPupil, mouseX, mouseY, maxOffset);

      // 更新右眼瞳孔位置
      updatePupilPosition(rightEyeCenter, rightPupil, mouseX, mouseY, maxOffset);

      const [x] = d3.pointer(event);

      if (x >= svgWidth / 2) {
        // 鼠标在右半部分，顶部颜色从黄色渐变到绿色
        const t = (x - svgWidth / 2) / (svgWidth / 2);
        const interpolate = d3.interpolateRgb('#FFD321', '#66CC00');
        topStop.attr('stop-color', interpolate(t));
      } else {
        // 鼠标在左半部分，顶部颜色固定为黄色
        topStop.attr('stop-color', '#FFD321');
      }

      const t = d3.scaleLinear()
        .domain([0, svgWidth])
        .range([0.1, 0.9])
        .clamp(true)(mouseX);
      mouth.attr("d", generateMouthPath(t));
      // // 动态参数
      // const upperLineRatio = t;         // 上边直线占比
      // const lowerLineRatio = 1 - t;     // 下边直线占比
    
      // // 计算各段长度
      // const upperArcWidth = mouthRadius * (1 - upperLineRatio); // 上边两侧四分之一圆总宽度
      // const lowerArcWidth = mouthRadius * (1 - lowerLineRatio); // 下边两侧四分之一圆总宽度
    
      // // 路径生成
      // const pathData = 
      //   // 起点：上边左顶点
      //   `M 0,0` +

      //   // 上边直线
      //   `H ${upperArcWidth}` +
        
      //   `A ${mouthRadius - upperArcWidth} ${mouthRadius - upperArcWidth} 0 0 1 ${mouthHeight},${mouthHeight - upperArcWidth}` +
        
      //   // 下边右四分之一圆（右下角）
      //   `A ${upperArcWidth} ${upperArcWidth} 0 0 1 ${mouthHeight - upperArcWidth},${mouthHeight}` +
        
      //   // 下边直线
      //   `H ${-lowerArcWidth}` +
        
      //   // 下边左四分之一圆（左下角）
      //   `A ${upperArcWidth} ${upperArcWidth} 0 0 1 ${-mouthHeight},${mouthHeight - upperArcWidth}` +
        
      //   // 闭合路径（左边上四分之一圆）
      //   `A ${mouthRadius - upperArcWidth} ${mouthRadius - upperArcWidth} 0 0 1 ${-upperArcWidth},0` +
      //   `H ${upperArcWidth}` +
      //   `Z`;
    
      // mouth.attr("d", pathData);
    });

    /**
     * 根据鼠标位置更新瞳孔位置，使其始终指向鼠标
     * @param eyeCenter 眼睛中心坐标
     * @param pupil 瞳孔元素
     * @param mouseX 鼠标X坐标
     * @param mouseY 鼠标Y坐标
     * @param maxOffset 瞳孔最大偏移量
     */
    function updatePupilPosition(eyeCenter : {x : number, y : number}, pupil : d3.Selection<SVGCircleElement, unknown, HTMLElement, any>, mouseX : number, mouseY : number, maxOffset : number) {
      const normX = mouseX / svgWidth;
      const normY = mouseY / svgHeight;

      // 将归一化坐标映射到瞳孔偏移量
      const offsetX = (normX - 0.5) * 2 * maxOffset;
      const offsetY = (normY - 0.5) * 2 * maxOffset;

      // 更新瞳孔的位置
      pupil.attr('cx', eyeCenter.x + offsetX)
          .attr('cy', eyeCenter.y + offsetY);
    }
    
  }, [])

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <div id="smileyContainer" />
    </div>
  )
}
