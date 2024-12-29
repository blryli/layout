function add(d, i) {
  console.log('d.type',d.type)
  // 图形
  const rect = new fabric[d.type]({
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

  const attrs = {
    selectable: !d.disabled,
    scalable: false,
    rotatable: false,
  }

  // 有分组添加进分组
  const {groupName} = d
  if(groupName) {
    if(!groups[groupName]) groups[groupName] = []
    groups[groupName].push(rect, text)
  } else { // 无分组直接绘制
    const group = new fabric.Group([rect, text], attrs)
    canvas.add(group);
    modified(group)
    canvas.setActiveObject(group);
  }
  
  // 绘制分组
  if(i === renders.length - 1) {
    Object.values(groups).forEach(g => {
      const group = new fabric.Group(g, attrs)
      canvas.add(group)
      modified(group)
      canvas.setActiveObject(group)
    })
  }
}

function modified(rect) {
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