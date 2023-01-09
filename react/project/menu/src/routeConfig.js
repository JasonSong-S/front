import {lazy} from "react"
const FoodDetail = lazy(()=>import('./FoodDetail'))
const MyHome = lazy(()=>import('./MyHome'))

const routes = [
    {
        path:"/home",
        component:MyHome
    },
    {
        path:"/detail",
        component:FoodDetail
    }
]

export default routes