export function filterMenu(data,role){
    data.filter((item)=>{
        return item.meta.role.indexOf(role) != -1
    }).map((item)=>{
        if (item.children){
            item.children = filterMenu(item.children,role)
        }else{
            return item
        }
    })
}