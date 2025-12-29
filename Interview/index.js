const authenticate=(body)=>{
    const {username,password}=body
}


app.post('/addContacts',authenticate,async (req,res)=>{

    try{
        const {obj}=req.body
        const contact=await prisma.contacts.create({
            data:obj
        })
        return res.status(201).json({"message":"Contact Created successfully","contact":contact})
    }catch(err){

    }
})


app.put('/addContacts',async (req,res)=>{

    try{
        const {obj}=req.body
        const contact=prisma.contacts.update({
            data:obj
        return res.status(201).json({"message":"Contact Created successfully","contact":contact})
        })
    }catch(err){

    }
})






select student_id from subjects 
where student_id=(
    select id from students 
    where name='Vishnu'
) and score>=50;

select * from students
where name like '_and_';




useEffect(async ()=>{
    try{const data=awiat fetch('http://localhost:3000/contacts')
    const contacts=await data.json()

    return contacts}catch(err){
        console.log(err.message)
        return err.message
    }

},[])