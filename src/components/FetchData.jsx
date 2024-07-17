import React,{useEffect, useState,useMemo} from 'react';
import axios from 'axios';
import './Table.css';

// https://randomuser.me/api/?results=20

// const [data, setData] = useState([
    //     { id: 1, name: 'Alice', age: 25, city: 'New York' },
    //     { id: 2, name: 'Bob', age: 30, city: 'Chicago' },
    //     { id: 3, name: 'Charlie', age: 35, city: 'San Francisco' },
    // ]);

const FetchData = () => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({key: null,direction:'ascending'});
    const [search, setSearch] = useState('');

    const sortedData = React.useMemo(() => {
        let sortableData = [...data];
        if (sortConfig.key !== null) {
          sortableData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableData;
      }, [data, sortConfig]);

      const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      const filteredData = useMemo (() => {
        return sortedData.filter(item => 
            item.name.first.toLowerCase().includes(search.toLowerCase()) ||
            item.name.last.toLowerCase().includes(search.toLowerCase()) ||
            item.location.street.number.toString().includes(search) ||
            item.location.street.name.toLowerCase().includes(search.toLowerCase()) ||
            item.location.city.toLowerCase().includes(search.toLowerCase()) ||
            item.location.state.toLowerCase().includes(search.toLowerCase()) ||
            item.location.country.toLowerCase().includes(search.toLowerCase())
        );
      }, [search, sortedData]);

    const getClassNamesFor = (name) => {
        if(!sortConfig.key) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    const dataFetchCall = () => {
        return  axios.get('https://randomuser.me/api/?results=20')
        .then((response) => response)
        .then((data) => {
            setData(data.data.results);
            // console.log(data.data.results);
            // setLocation(data.data.results[0].location);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        dataFetchCall();
    },[])

  return (
    <div>
        <div style={{marginBottom:'20px'}} >
        <input type='text' placeholder='Search....' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
       <div style={{display:'flex',justifyContent:'center'}}>
        <table style={{border:'1px solid black'}} >
            <thead>
                <tr>
                    <th onClick={() => requestSort('name.first')} className={getClassNamesFor('name.first')}>FirstName</th>
                    <th onClick={() => requestSort('name.last')} className={getClassNamesFor('name.last')}>LastName</th>
                    <th onClick={() => requestSort('location.street.number')} className={getClassNamesFor('location.street.number')}>Street</th>
                    {/* <th>Street Name</th>*/}
                    <th onClick={() => requestSort('location.city')} className={getClassNamesFor('location.city')}>City</th>
                    <th onClick={() => requestSort('location.state')} className={getClassNamesFor('location.state')}>State</th>
                    <th onClick={() => requestSort('location.country')} className={getClassNamesFor('location.country')}>Country</th>  
                </tr>
            </thead>
            <tbody>
                {filteredData.map((item,index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name.first}</td>
                            <td>{item.name.last}</td>
                            <td>{item.location.street.number}, {item.location.street.name}</td>
                            <td>{item.location.city}</td>
                            <td>{item.location.state}</td>
                            <td>{item.location.country}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default FetchData;