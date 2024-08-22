let mysql = require("mysql2");
const express = require("express");
const { Server } = require("http");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nathandata",
  database: "Empolyess",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

app.post("/post", (req, res) => {
  const { id, name, employee_code, salary } = req.body;

  if (!name || !employee_code || !salary) {
    return res.json("Enter valid details");
  }

  connection
    .promise()
    .query("insert into empolyee_details values (?,?,?,?)", [
      id,
      name,
      employee_code,
      salary,
    ])
    .then((data) => res.status(200).send(data[0]))
    .catch((err) => console.log(err));
});

app.get("/get", (req, res) => {
  connection
    .promise()
    .query("SELECT * FROM empolyee_details")
    .then((data) => res.send(data[0]))
    .catch((err) => console.log(err));
});

app.get("/get/:id", (req, res) => {
  const items = req.params.id;
  connection.query(
    "SELECT * FROM empolyee_details WHERE id = ?",
    items,
    (err, result) => {
      if (err) {
        console.log("error", err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put('/put/:id', (req,res) =>{
    const id = req.params.id
    const { name, employee_code, salary} = req.body

 connection.query('UPDATE empolyee_details SET name = ?, employee_code = ?, salary = ?  WHERE id = ?', [name,employee_code,salary,id], (err)=>{
    if(err){
        console.log('error', err);
    }else
    {
        res.send('update')
    }
 })
})

app.delete('/delete/:id', (req,res)=>{
    const del = req.params.id
    connection.query('DELETE FROM empolyee_details WHERE id = ?', del,(err)=>{
    
        if(err){
            console.log('error', err);
        }else
        {
            res.send('deleted')
        }
    })
    })


app.listen(3002);
console.log("server is running on port 3002");

// async function connect() {

//     try {
//         const connection = await mysql.createConnection(
//           'mysql://root:Nathandata@localhost:3306/Empolyess'
//         );

//         console.log("connected to the db")
//       } catch (err) {
//         console.log(err);
//       }

// }

// connect();
