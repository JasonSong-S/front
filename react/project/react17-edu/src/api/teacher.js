import service from "../utils/request";

export function getTeacherList(data){
    return service({
        url:"teacher/teacherList",
        method:"post",
        data
    })
}

// 新增教师接口
export function addTeacher(data){
    return service({
        url:"teacher/addTeacher",
        method:"post",
        data
    })
}


// 编辑教师接口
export function editTeacher(data){
    return service({
        url:"teacher/editTeacher",
        method:"post",
        data
    })
}

// 删除教师接口 
export function deletes(data){
    return service({
        url:"/teacher/delete",
        method:"post",
        data
    })
}


// 批量删除教师接口  参数 id数组
export function batchDelete(data){
    return service({
        url:"/teacher/batchDelete",
        method:"post",
        data
    })
}

