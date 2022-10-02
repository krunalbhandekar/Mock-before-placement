window.addEventListener("load",function(){
 employee(page,department,salary,searchh)
})
let page=1
let num=document.querySelector("#num")
num.textContent=page
let totalpages=7
let department="All"
let salary=0
let searchh=0

function employee(page,department,salary,searchh){
    
    const url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}`

    fetch(url).then(function(res){
        return res.json()
    }).then(function(res){
        // console.log(res.data);
        if(department=="All"){
         append(res.data)
        }
         if(department!=="All"){
            let newdata=res.data.filter((el,i)=>el["department"]==department)
            append(newdata)
        }
         if(salary!=0){
            console.log(salary);
            if(salary=="desc"){
                 let newsalary=res.data.sort((a,b)=>b.salary-a.salary)
            //  console.log('newsalary:', newsalary)
            append(newsalary)
            }
            if(salary=="asc"){
                 let newsalary=res.data.sort((a,b)=>a.salary-b.salary)
            //  console.log('newsalary:', newsalary)
            append(newsalary)
            }   
        }
        if(searchh!=0){
            let newsearch=res.data.filter((el,i)=>el["name"]==searchh)
            append(newsearch)
        }
    }).catch(function(err){
        console.log(err);
    })
}

function append(data){

    document.querySelector("#employee").innerHTML=""
    data.map(function(el){
        let main=document.createElement("tr")
        // main.setAttribute("class","main")

    
        let imgdiv=document.createElement("td")
        imgdiv.setAttribute("class","imgdiv")

        let image=document.createElement("img")
        // image.src=el.image
        image.src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        image.setAttribute("class","img")

        let name=document.createElement("td")
        name.textContent=el.name

        let department=document.createElement("td")
        department.textContent=el.department

        let gender=document.createElement("td")
        gender.textContent=el.gender

        let salary=document.createElement("td")
        salary.textContent=el.salary

        imgdiv.append(image)
        main.append(imgdiv,name,department,gender,salary)
        document.querySelector("#employee").append(main)
    })
}

function inc(){
    if(page<totalpages){
         page=page+1
        num.textContent=page
employee(page,department,salary,searchh)

    }
    else{
        alert("page limit over")
    }
   
}
function dec(){
    if(page>1){
         page=page-1
         num.textContent=page
employee(page,department,salary,searchh)

    }
     else{
        alert("page cant less than 1")
    }
   
}

function handledepartment(){
    department=document.querySelector("#filterdepartment").value
         employee(page,department,salary,searchh) 
        console.log(department) 
}
function handlesalary(){
    salary=document.querySelector("#sortsalary").value
     console.log('salary:', salary)
     employee(page,department,salary,searchh) 
}
function search(){
    searchh=document.querySelector("#search").value
    // console.log('search:', searchh)
     employee(page,department,salary,searchh) 

}

