import React, {Component} from "react";
import Plot from 'react-plotly.js';
import fakeData from "../../data/fakeData2.json";
import ReactDOM from 'react-dom'; 

console.log(fakeData);

class BarChart extends Component{
    
    render(){
        console.log({data : this.props.route.params.data}.map( item => { return item.ID_INTERV_FREQ }));
        return(
            <div>
                <Plot 
                    data={[
                        {type: 'bar',
                        x: {data : this.props.route.params.data}.map( item => { return item.ID_INTERV_FREQ }),
                        y: {data : this.props.route.params.data}.map( item => { return item.Number }),
                    }
                    ]}
                    layout={{width:1000, height: 500, title:'test'}}
                    onClick={() => console.debug("onClick")}
                />
            </div>
        )
    }
}

export default BarChart;