import { useEffect, useState } from "react";
import { RatingData } from "../../data/RatingData";
import LoadData from "../LoadData"
import { motion } from "framer-motion";
const RatingTable = ({name}) => {
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(false);
    const table = RatingData;

    /* Gets all the contest information */
    useEffect(() => {
        fetch(`https://codeforces.com/api/user.rating?handle=${name}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setRating(data.result);
            setLoading(true);
        })
    },[name])

    return (
        <div className="w-full">
            {loading && 
            <div className="w-full flex flex-col items-center">
                {table.map((row,index) => (
                    <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {
                            opacity: 0.2,
                            x: index%2===0 ? '5vw' : '-5vw'
                        },
                        visible: {
                            opacity: 1,
                            x: 0
                        }
                    }}

                    className="flex w-3/5 lg:w-1/3 " key={index}>
                        <div className={`border-black py-4 w-3/4 pl-4 ${row.style1}`}>{row.rowData}</div>
                        <div className={`border-black py-4 w-1/4 text-center ${row.style2}`}>
                            {<LoadData index={index} rating={rating} />}
                        </div>
                    </motion.div>
                ))} 
            </div>}
        </div> 
    );
}
 
export default RatingTable;