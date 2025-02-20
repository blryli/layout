function draw(group, index) {
  const attrs = {
    selectable: !group.some(d => d.disabled),
    scalable: false,
    rotatable: false,
  }
  const rect = new fabric.Group(group, attrs)
  rect.zIndex = index
  canvas.add(rect)
  // canvas.setActiveObject(rect)
  // 禁用矩形的默认旋转行为
  // rect.lockRotation = true;
  // rect.lockMovementY = true;
  // rect.scalable = false;

  // 监听矩形的旋转事件（注意：Fabric.js没有直接的'rotating'事件，所以我们使用'modified'事件）
  // rect.on('modified', function() {
  //   // 获取当前角度
  //   let angle = rect.getAngle();
  //   console.log('angle',angle)
    
  //   // 计算最接近的90度或180度
  //   let newAngle = Math.round(angle / 90) * 90;
    
  //   // 如果新角度与当前角度不同，则更新角度
  //   if (newAngle !== angle) {
  //     rect.setAngle(newAngle);
  //     // 由于我们禁用了默认旋转行为，所以需要手动设置坐标和渲染
  //     rect.setCoords();
  //     canvas.renderAll();
  //   }
  // });
}

function addOne(d, i) {
  // 图形
  const rect = new fabric[d.type || 'Rect']({
    ...{
      width: 200,
      height: 100,
      left: 100,
      top: 50,
      objectCaching: false,
      fill: d.disabled ? 'white' : "#f5f5f5",
      stroke: "#ccc",
      strokeWidth: 1,
    },
    ...d,
  });
  // 文本
  const text = new fabric.Text(d.text, {
    fontSize: d.fontSize || 14,
    left: rect.left + rect.width / 2,
    top: rect.top + rect.height / 2,
    originX: "center",
    originY: "center",
  });

  const {groupName} = d
  const name = groupName || `item${i}`
  if(!groups[name]) groups[name] = []
  groups[name].push(rect, text)
  
  // 绘制分组
  if(i === renders.length - 1) {
    Object.values(groups).forEach((g, i) => {
      draw(g, i)
    })
  }
}

function add(params) {
  const renders = Array.isArray(params) ? params : [params]
  renders.forEach((d, i) => {
    addOne(d, i)
  })
  // 按 zIndex 排序对象数组
  canvas.getObjects().sort((a, b) => a.zIndex - b.zIndex)

  // 刷新画布显示
  canvas.requestRenderAll()
}