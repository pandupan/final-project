import React, { useEffect,useState } from "react";
import axios from 'axios'

function App () {
    
    //materi fetching data
    const [data, setData] = useState(null)
    
    //materi create data
    const [input, setInput] = useState(
        {
            name: "",
            course: "",
            score: null
        }
      )

    let index = 1

    //indikator
    const [fetchStatus, setFetchStatus] = useState(true)

    //indikator
    const [currentId, setCurrentId] = useState(-1)

    useEffect(() => {
        //fetch data dengan kondisi
        if (fetchStatus === true) {
            axios.get("http://backendexample.sanbercloud.com/api/student-scores")
              .then((res) => {
                setData([...res.data])
              })
              .catch((error) => {
              })
            setFetchStatus(false)
          }
      
        }, [fetchStatus, setFetchStatus])      

    
  //handling input
  const handleName = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "name") {
      setInput({ ...input, name: value });
    }
  };
  
  const handleCourse = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "course") {
      setInput({ ...input, course: value });
    }
  };
  
  const handleScore = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "score") {
      setInput({ ...input, score: value });
    }
  };
  
  //handling submit
  const handleSubmit = (event) => {
    event.preventDefault()
    let { name } = input;
    let { course } = input;
    let { score } = input;  

    if (currentId === -1) {

    //create data
    axios.post('https://backendexample.sanbercloud.com/api/student-scores', { name, course, score })
      .then((res) => {
        console.log(res)
        setFetchStatus(true)
      })

    }else{

        // update data
    // Update data
    axios.put(`https://backendexample.sanbercloud.com/api/student-scores/${currentId}`, { name, course, score })
      .then((res) => {
        console.log(res);
        setFetchStatus(true);
      })
  }

    //balikin indikator ke -1
    setCurrentId(-1)

    //clear input setelah create data
    setInput(
      {
        name: "",
        course: "",
        score: "",
      }
    )
      

  }
  console.log(input)
  console.log(data)

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);
  
    axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
      .then((res) => {
        setFetchStatus(true);
      });
  };
  
  const handleEdit = (event) => {
    let idData = parseInt(event.target.value);
    setCurrentId(idData);
  
    axios.get(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
      .then((res) => {
        let data = res.data
        
        setInput(
          {
            name : data.name,
            course : data.course,
            score : data.score
          }
        )


      });
  };
  
    
    //handling Index Skor
    const handelIndexScore = (hasil) => {
    if (hasil >= 80){
        return 'A'
    }else if ( hasil >= 70 && hasil <80) {
        return 'B'
    }else if (hasil >= 60 && hasil < 70) {
        return 'C'
    }else if (hasil >= 50 && hasil < 60) {
        return 'D'
    }else if ( hasil < 50 && hasil != null) {
        return 'E'
    }}
    
    return (
        <>

<div class="rounded  justify-center items-center mt-[2%] ml-[2%] max-w-[1680px] ">
<div class="rounded relative  mb-[3%]">
    <table class="rounded w-full text-left text-white ">
        <thead class=" text-white uppercase bg-violet-500">
            <tr>
        <th scope="col" className="px-6 py-3">
          NO
        </th>
        <th scope="col" className="px-[80px] py-3">
          NAMA
        </th>
        <th scope="col" className="px-60 py-3">
          MATA KULIAH
        </th>
        <th scope="col" className="px-[40px] py-3">
          NILAI
        </th>
        <th scope="col" className="px-[100px] py-3">
          INDEX NILAI
        </th>
        <th scope="col" className="px-[110px] py-3">
          ACTION 
          </th>
      </tr>
    </thead>
    <tbody>
    {data !== null && data.map((res)=>{
    return (
        <tr class="bg-white border  text-gray-500 whitespace-nowrap dark:text-gray-500">
        <th scope="row" class="px-6 py-4">
            {index ++}
        </th>
        <td class="px-[80px] py-3">
                            {res.name}
        </td>
        <td class="px-60 py-3">
                            {res.course}
        </td>
        <td class="px-[40px] py-3">
                            {res.score}
        </td>
        <td class="px-[140px] py-3">
                            {handelIndexScore(res.score)}
        </td>
        <td>
        <div class="px-[105px] inline-flex bg-transparent mt-[7px] ">
        <button onClick={handleEdit} value={res.id} class="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-1 px-2 border border-gray-300 rounded">
                Edit
        </button>
        <button onClick={handleDelete} value={res.id} class="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-gray-300 rounded">
                Delete
        </button>
        </div>
        </td>
        </tr>
        )
         })}
    </tbody>
    </table>
</div>
<div class=" justify-center items-center max-w-[1680px] ">
  <form onSubmit={handleSubmit} class="bg-white border rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Name :
      </label>
      <input onChange={handleName} value={input.name} name='name'  class=" bg-[#F9F9FB] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder=""></input>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Mata Kuliah :
      </label>
      <input onChange={handleCourse} value={input.course} name='course' class=" bg-[#F9F9FB] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="course" type="text" placeholder=""></input>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Nilai :
      </label>
      <input onChange={handleScore} value={input.score} name='score'  class=" bg-[#F9F9FB] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="score" type="text" placeholder="0"></input>
    </div>
    <div class="flex items-center justify-between">
      <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type={'submit'} />
    </div>
  </form>
</div>
</div>

</>

    )

}

export default App