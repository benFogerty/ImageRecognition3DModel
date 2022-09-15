import './Chart.css'
import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";



export default function Chart(props) {

    const colors = scaleOrdinal(schemeCategory10).range();

    let percArr = [0,0,0,0,0,0,0,0,0,0]
    if(props.percArr){
        percArr = props.percArr
    }


    const data = [
        {
            name: "0",
            uv: percArr[0],
        },
        {
            name: "1",
            uv: percArr[1],
        },
        {
            name: "2",
            uv: percArr[2],
        },
        {
            name: "3",
            uv: percArr[3],
        },
        {
            name: "4",
            uv: percArr[4],
        },
        {
            name: "5",
            uv: percArr[5],
        },
        {
            name: "6",
            uv: percArr[6],
        },
        {
            name: "7",
            uv: percArr[7],
        },
        {
            name: "8",
            uv: percArr[8],
        },
        {
            name: "9",
            uv: percArr[9],
        },
    ];

    const getPath = (x: number, y: number, width: number, height: number) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3
            } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
            }, ${y + height}
  Z`;
    };

    const TriangleBar: FunctionComponent<any> = (props: any) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };







    return (
        <BarChart
            width={400}
            height={300}
            data={data}

        >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" id='xaxis' fill='#000000'/>
            <YAxis id='yaxis' />
            <Bar
                dataKey="uv"
                fill="#fff"
                shape={<TriangleBar />}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
            </Bar>
        </BarChart>
    );
}