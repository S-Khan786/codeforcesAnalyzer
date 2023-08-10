import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import { motion } from 'framer-motion'
import Chart from 'chart.js/auto'
import { firstPieColors, secondPieColors, doughtnutColors } from '../data/Colors'
import Attempts from './Tables/Attempts'
import { alphabetRatedBg } from '../data/Questions/alphabetRatedBg'
import { alphaRatedBorColor } from '../data/Questions/alphaRatedBorColor'
import { subDataBg } from '../data/Questions/subDataBg'
import { subDataBorColor } from '../data/Questions/subDataBorColor'
import { verdictDataBg } from '../data/Questions/verdictDataBg'
import { verdictDataBorColor } from '../data/Questions/verdictDataBorColor'
import { numRatedBorColor } from '../data/Questions/numRatedBorColor'
import { numRatedBg } from '../data/Questions/numRatedBg'

ChartJS.register(ArcElement, Tooltip, Legend)


const Question = ({name}) => {
    const [data,setData] = useState()
    const [loading, setLoading] = useState(false)
    const [calc, setCalc] = useState(false)

    const universalMap = new Map();

    const submissionsPieChart = new Map();
    const [loadSubmissionPieKey, setLoadSubmissionPieKey] = useState([]);
    const [loadSubmissionPieVal, setLoadSubmissionPieVal] = useState([]);

    const verdictPieChart = new Map();
    const [loadVerdictPieKey, setLoadVerdictPieKey] = useState([]);
    const [loadVerdictPieVal, setLoadVerdictPieVal] = useState([]);

    const topicsPieChart = new Map();
    const [loadTopicsPieKey, setLoadTopicsPieKey] = useState([]);
    const [loadTopicsPieVal, setLoadTopicsPieVal] = useState([]);

    let alphabetRatedQs = new Map();
    const [loadAlphaRatedBarKey, setLoadAlphaRatedBarKey] = useState([]);
    const [loadAlphaRatedBarVal, setLoadAlphaRatedBarVal] = useState([]);

    let numRatedQs = new Map();
    const [loadNumRatedBarKey, setLoadNumRatedBarKey] = useState([]);
    const [loadNumRatedBarVal, setLoadNumRatedBarVal] = useState([]);

    const [colors, setColors]  = useState([]);

    function rainbowStop(h) 
    {
        let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);  
        let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0)).join('');
        return (`${rgb2hex(f(0), f(8), f(4))}`);
    } 
    if(calc) 
    {
        setCalc(false);
        for(let i=0; i<data.length; i++)
        {
            const submissionInLanguage = data[i].programmingLanguage;
            // if language is present then update the counter
            if(submissionsPieChart.has(submissionInLanguage))
            {
                let prevSubs = submissionsPieChart.get(submissionInLanguage);
                submissionsPieChart.set(submissionInLanguage, prevSubs+1);
            }
            else // o/w add the new language
            { 
                submissionsPieChart.set(submissionInLanguage, 1);
            }

            const verdict = data[i].verdict;
            if(verdictPieChart.has(verdict))
            {
                let prevNum = verdictPieChart.get(verdict);
                verdictPieChart.set(verdict, prevNum+1);
            }
            else
            {
                verdictPieChart.set(verdict, 1);
            }

            const id = data[i].problem.contestId + data[i].problem.index;

            if(universalMap.has(id) === false)
            {
                const rating = data[i].problem.rating;
                const alphabet = data[i].problem.index;

                if(verdict === "OK")
                { // succesful submission thus {1, 0}
                    universalMap.set(id, [1, 0]);

                    // updating difficulty based on problem no. in contest bar chart
                    if(alphabetRatedQs.has(alphabet))
                    {
                        let prevSolved = alphabetRatedQs.get(alphabet);
                        alphabetRatedQs.set(alphabet, prevSolved+1);
                    }
                    else
                    {
                        alphabetRatedQs.set(alphabet, 1);
                    }

                    // updating the difficulty based on number Bar Chart
                    if(numRatedQs.has(rating))
                    {
                        let prevSolved = numRatedQs.get(rating);
                        numRatedQs.set(rating, prevSolved+1);
                    }
                    else
                    {
                        numRatedQs.set(rating, 1);
                    }

                    // updating topics pie chart 
                    const tags = data[i].problem.tags;
                    for(let j=0; j<tags.length; j++)
                    {
                        if(topicsPieChart.has(tags[j])) 
                        {
                            let prevSolved = topicsPieChart.get(tags[j]);
                            topicsPieChart.set(tags[j], prevSolved+1);
                        }
                        else
                        {
                            topicsPieChart.set(tags[j], 1);
                        }
                    }
                }
                else // unsuccesful submission thus {0, 1} 
                {
                    universalMap.set(id, [0, 1]);
                }
            }
            else
            {
                let prevSubmitted = universalMap.get(id);
                if(verdict === "OK")
                    prevSubmitted[0] += 1;
                else
                    prevSubmitted[1] += 1;
                universalMap.set(id, prevSubmitted);
            }
        }
        
        //merging all D + D1 + D2 in D 
        for (const [key, value] of alphabetRatedQs.entries()) {
            if(key.length > 1)
            {
                let firstChar = key[0];
            
                if(alphabetRatedQs.has(firstChar))
                {
                    let prevSolved = alphabetRatedQs.get(firstChar);
                    alphabetRatedQs.set(firstChar, prevSolved+value);
                }
                else
                {
                    alphabetRatedQs.set(firstChar, value);
                }
                alphabetRatedQs.delete(key);
            }
        }
        alphabetRatedQs = new Map([...alphabetRatedQs].sort((a, b) => String(a[0]).localeCompare(b[0]))); 

        //remove undefined
        for(let [key, value] of numRatedQs.entries()) {
            if(key === undefined) {
                numRatedQs.delete(key);
            }
        }

        for(let [key, value] of verdictPieChart.entries()) {
            if(key === "OK") {
                verdictPieChart.set("AC",value);
                verdictPieChart.delete("OK");
            }
            else if(key === "WRONG_ANSWER") {
                verdictPieChart.set("WA",value);
                verdictPieChart.delete("WRONG_ANSWER");
            }
            else if(key === "TIME_LIMIT_EXCEEDED") {
                verdictPieChart.set("TLE",value);
                verdictPieChart.delete("TIME_LIMIT_EXCEEDED");
            }
            else if(key === "MEMORY_LIMIT_EXCEEDED") {
                verdictPieChart.set("MLE",value);
                verdictPieChart.delete("MEMORY_LIMIT_EXCEEDED");
            }
            else if(key === "RUNTIME_ERROR") {
                verdictPieChart.set("RTE",value);
                verdictPieChart.delete("RUNTIME_ERROR");
            }
            else if(key === "COMPILATION_ERROR") {
                verdictPieChart.set("CPE",value);
                verdictPieChart.delete("COMPILATION_ERROR");
            }
            else if(key === "IDLENESS_LIMIT_EXCEEDED") {
                verdictPieChart.set("ILE",value);
                verdictPieChart.delete("IDLENESS_LIMIT_EXCEEDED");
            }
            else if(key === "CHALLENGED") {
                verdictPieChart.set("CLE",value);
                verdictPieChart.delete("CHALLENGED");
            }
            else if(key === "SKIPPED") {
                verdictPieChart.set("SKI",value);
                verdictPieChart.delete("SKIPPED");
            }
        } 

        setLoadSubmissionPieKey([...submissionsPieChart.keys()]);
        setLoadSubmissionPieVal([...submissionsPieChart.values()]);

        setLoadVerdictPieKey([...verdictPieChart.keys()]);
        setLoadVerdictPieVal([...verdictPieChart.values()]);

        setLoadTopicsPieKey([...topicsPieChart.keys()]);
        setLoadTopicsPieVal([...topicsPieChart.values()]);

        let updatedColors = [];
        for(let it=0; it<topicsPieChart.size; it++)
        {
            let newColor = rainbowStop(Math.random()*100);
            updatedColors = [...updatedColors, newColor];
        }
        setColors(updatedColors);
        // Colors = Colors.map(color => JSON.stringify(color));
        
        setLoadAlphaRatedBarKey([...alphabetRatedQs.keys()]);
        setLoadAlphaRatedBarVal([...alphabetRatedQs.values()]);

        let array = Array.from(numRatedQs, ([rating, solved]) => ({rating, solved}));
        array.sort((a,b) => (a.rating > b.rating) ? 1 : (a.rating < b.rating) ? -1 : 0);
        
        let keys = array.map(item => item.rating);
        let values = array.map(item => item.solved);

        setLoadNumRatedBarKey([...keys]);
        setLoadNumRatedBarVal([...values]);
    }

    // loading all the charts with data after processing and storing it in arrays/hashmaps
    const alphabetRatedData = {
        labels : loadAlphaRatedBarKey ? [...loadAlphaRatedBarKey] : [],
        datasets : [{
            label : "Solved",
            data : loadAlphaRatedBarVal ? [...loadAlphaRatedBarVal] : [],
            backgroundColor : [...alphabetRatedBg],
            borderColor : [...alphaRatedBorColor],
            borderWidth : 2,
        }]
    };

    const submissionData = {
        labels : loadSubmissionPieKey ? [...loadSubmissionPieKey] : [],
        datasets : [{
            label : "",
            data : loadSubmissionPieVal ? [...loadSubmissionPieVal] : [],
            backgroundColor : [...subDataBg],
            borderColor : [...subDataBorColor],
            borderWidth : 1,
            hoverOffSet : 5,
        }]
    };

    const verdictData = {
        labels : loadVerdictPieKey ? [...loadVerdictPieKey] : [],
        datasets : [{
            label : "",
            data : loadVerdictPieVal ? [...loadVerdictPieVal] : [],
            hoverOffSet : 5,
            backgroundColor : [...verdictDataBg],
            borderColor : [...verdictDataBorColor],
            borderWidth : 2,
        }]
    }

    const topicsData = {
        labels : loadTopicsPieKey ? [...loadTopicsPieKey] : [],
        datasets : [{
            label : "",
            data : loadTopicsPieVal ? [...loadTopicsPieVal] : [],
            hoverOffSet : 5,
            backgroundColor : colors ? [...colors] : [],
        }]
    }

    const numRatedData = {
        labels : loadNumRatedBarKey ? [...loadNumRatedBarKey] : [],
        datasets : [{
            label : "Rating Question",
            data : loadNumRatedBarVal ? [...loadNumRatedBarVal] : [],
            backgroundColor : [...numRatedBg],
            borderColor : [...numRatedBorColor],
            borderWidth : 2,
        }]
    } 
    
    useEffect(() => {
        setCalc(false)
        fetch(`https://codeforces.com/api/user.status?handle=${name}&from=1&count=100000`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            // console.log(data.result);
            setData(data.result);
            setCalc(true)
            setLoading(true)
        })
    }, [name]);

    return (
        <div className='w-5/6 px-2 lg:w-3/4'>
            {
                loading && 
                <>
                <div className='my-8 w-full bg-white flex flex-col items-center'>
                    <div className='flex w-full flex-col lg:flex-row items-center'>
                        <div className='w-1/2 p-8 flex flex-col items-center'>
                            <p className='mb-2'>Languages that you use:</p>
                            <Pie data={submissionData} />
                            <p className='font-extralight text-sm mt-2'>(Hover to know the specifics)</p>
                        </div>
                        <div className='w-1/2 p-8 flex flex-col items-center'>
                            <p className='mb-2'>Subsmission Verdicts:</p>
                            <Pie data={verdictData} />
                            <p className='font-extralight text-sm mt-2'>(Hover to know the specifics)</p>
                        </div>
                    </div> 
                    <div className='mt-4 w-3/5 '>
                        <p>Different topics that you've covered</p>
                        <Doughnut data={topicsData} />
                    </div>
                    <div className='mt-4 w-4/5'>
                        <p>Alphabet marked question</p>
                        <Bar data={alphabetRatedData} height={300} width={500}/>
                        <p>Rating marked question</p>
                        <Bar data={numRatedData} height={300} width={500} />
                    </div>
                </div>
                </>
            }
        </div>
    );
}
 
export default Question;