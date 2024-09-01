const Enums = {
    Color: {
        RED: 'red',
        GREEN: 'green',
        BLUE: 'blue',
    },
    Direction: {
        NORTH: 'north',
        SOUTH: 'south',
        EAST: 'east',
        WEST: 'west',
    },
    MessageType:{
        simple_message: 0,
        system_info: 1,
        system_notice: 2,
        disk_expansion_application: 3,
        heartbeat: 4,
        disk_expansion_application_deal: 5,
    }
};

// 使用枚举
function describeMessage(msg) {
    switch (msg) {
        case Enums.MessageType.system_notice:
            return '系统通知';
        case Enums.MessageType.simple_message:
            return '普通消息';
        case Enums.MessageType.system_info:
            return '系统信息';
        case Enums.MessageType.disk_expansion_application:
            return '空间申请';
        case Enums.MessageType.heartbeat:
            return '心跳检查';
        case Enums.MessageType.disk_expansion_application_deal:
            return '空间申请处理结果';
        default:
            return '未知消息';
    }
}

export {
    Enums,
    describeMessage
}