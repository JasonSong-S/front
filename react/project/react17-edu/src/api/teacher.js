import service from "../utils/request";

export function getTeacherList(data){
    return service({
        url:"teacher/teacherList",
        method:"post",
        data
    })
}