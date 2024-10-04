import React, {useState} from "react"
import BootstrapTable from "react-bootstrap-table-next"
import data from './matches data.json'
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import './App.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


function App() {

  const [myStyle,setMyStyle]=useState({ backgroundColor: "black", color: "white" })
  const [nvbarStyle,setNvbarStyle]=useState({ backgroundColor: "white", color: "black" })
  const [tableStyle, setTableStyle]=useState({ backgroundColor: "#FFE5B4", color: "black" , border:"1px black"})
  const [filterStyle, setFilterStyle]=useState({ backgroundColor: "white", color: "black"})
  const [headStyle, setHeadStyle]=useState({color: "black", backgroundColor:"#ADD8E6"})
  const [textonmode, setTextonmode]=useState("Dark Mode")
  // const [searchStyle, setSearchStyle]=useState({ backgroundColor: "black", color:"white"})
  
  const toggleStyle = ()=> {
    if(myStyle.color==='white'){
      setMyStyle({ color:'black', backgroundColor:'white' })
      setNvbarStyle({ color:'white',  backgroundColor:'black' })
      setTableStyle({ color:'white', backgroundColor:'#AA6C39', border:"1px white"})
      setFilterStyle({ color:'white',  backgroundColor:'black' })
      setHeadStyle({color:'white', backgroundColor:'#123456'})
      setTextonmode("Light Mode")
    }else{
      setMyStyle({ color:'white', backgroundColor:'black' })
      setNvbarStyle({ color:'black', backgroundColor:'white' })
      setTableStyle({ color:'black', backgroundColor:'#FFE5B4', border:"1px black" })
      setFilterStyle({ color:'black',  backgroundColor:'white' })
      setHeadStyle({color:'black', backgroundColor: '#ADD8E6'})
      setTextonmode("Dark Mode")
    }
  }

  const selectOptions = {
    "normal": 'normal',
    "tie": 'tie',
    "no result": 'no result'
  };

  const selectdecision ={
    "bat": 'bat',
    "field": 'field'
  }

  // const selectteam={
  //   "Sunrisers Hyderabad": "Sunrisers Hyderabad",
  //   "Royal Challengers Bangalore": "Royal Challengers Bangalore",
  //   "Rising Pune Supergiants": "Rising Pune Supergiants",
  //   "Rajasthan Royals": "Rajasthan Royals",
  //   "Pune Warriors": "Pune Warriors",
  //   "Mumbai Indians": "Mumbai Indians",
  //   "Kolkata Knight Riders": "Kolkata Knight Riders",
  //   "Kochi Tuskers Kerala": "Kochi Tuskers Kerala",
  //   "Kings XI Punjab": "Kings XI Punjab",
  //   "Gujarat Lions": "Gujarat Lions",
  //   "Delhi Daredevils": "Delhi Daredevils",
  //   "Deccan Chargers": "Deccan Chargers",
  //   "Chennai Super Kings": "Chennai Super Kings"
  // }
  // formatter: cell => selectteam[cell], options: selectteam,
  const columns = [
    {dataField:"season", text:"Season", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    {dataField:"city", text:"City", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    {dataField:"date", text:"Date", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    {dataField:"team1", text:"Team 1", headerStyle: headStyle, sort:true,  filter: textFilter({ style: filterStyle})},
    {dataField:"team2", text:"Team 2", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    {dataField:"toss_winner", text:"Toss Winner", headerStyle: headStyle, sort:true, filter: textFilter({placeholder: "Enter Toss winner", style: filterStyle})},
    {dataField:"toss_decision", text:"Toss Decision", headerStyle: headStyle, sort:true, formatter: cell => selectdecision[cell], filter: selectFilter({options: selectdecision, placeholder: "Enter Decision", style: filterStyle})},
    {dataField:"result", text:"Result", headerStyle: headStyle, sort:true, formatter: cell => selectOptions[cell], filter: selectFilter({options: selectOptions, placeholder: "Enter Result", style: filterStyle})},
    {dataField:"winner", text:"Winner", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    // {dataField:"win_by_runs", text:"Margin", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    {dataField:"win_by_wickets", text:"Wickets", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
    {dataField:"player_of_match", text:"Player of the Match", headerStyle: headStyle, sort:true, filter: textFilter({style: filterStyle})},
  ];

  const pagination = paginationFactory({
    page : 1,
    sizePerPage : 5,
    lastPageText : '>>',
    firstPageText : '<<',
    nextPageText : '>',
    prePageText : '<',
    showTotal : true,
    alwaysShowAllBtns : true
  })

  const { ExportCSVButton }=CSVExport;

  const MyExportCSV =(props)=> {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div className="expcsv">
        <button className="btn btn-success" onClick={handleClick} style={myStyle}>Export CSV!!</button>
      </div>
    )
  }

  const { SearchBar } = Search;

  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      props.onSearch(input.value);
    };
    return (
      <div>
        <div className="searchbar" style={myStyle}>
          <div className="searchinput">
            <input
              className="sinput"
              placeholder="Search"
              aria-label="Search"
              style={ { backgroundColor: 'white'} }
              ref={ n => input = n }
              type="text"
            /> 
            
            <div className="searchbtn"><button className="btn btn-outline-success" onClick={ handleClick }>Click to Search!!</button></div>
          </div>
          <div class="switchbtn">
            {/* <div className="textmode">{textonmode}</div> */}
            <button class="form-check-input" style={nvbarStyle} type="checkbox" onClick={toggleStyle} id="flexSwitchCheckDefault">{textonmode}</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App" style={myStyle}>
      <div className="nvbar" style={nvbarStyle}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" style={nvbarStyle} href="/">IPL DataSet</a>
            <a className="navbar-brand" style={nvbarStyle} aria-current="page" href="/">Home</a>
          </div>
        </nav>
      </div>
      <div className="Tablebody" style={tableStyle}>
      
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={ data }
        columns={ columns }
        exportCSV
        search
      >
        {
          props => (
            <React.Fragment>
              {/* <SearchBar {...props.searchProps} /> */}
              <MySearch {...props.searchProps}/>
              <BootstrapTable
                // bootstrap4
                // keyField="id"
                // data={data}
                // columns={columns}
                bordered={false}
                hover
                // style={{ headerStyle: { backgroundColor: 'red' } }}
                rowStyle={tableStyle}
                condensed
                pagination={pagination}
                filter={filterFactory()}
                // filterPosition='top' 
                {...props.baseProps}
              />
              <ExportCSVButton {...props.csvProps} />
              <MyExportCSV {...props.csvProps} />
            </React.Fragment>
          )
        }
      </ToolkitProvider>
      </div>
    </div>
  );
}

export default App;
