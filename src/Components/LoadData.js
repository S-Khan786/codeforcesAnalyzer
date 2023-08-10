const LoadData = ({index,rating}) => {
    var data;

    if(parseInt(index)===0) {
        data = rating.length;
    }
    else if(parseInt(index)===1) {
        const ranks = rating.map(contest => contest.rank);
        data = Math.min(...ranks);
    }
    else if(parseInt(index)===2) {
        const ranks = rating.map(contest => contest.rank);
        data = Math.max(...ranks);
    }
    else if(parseInt(index)===3) {
        const change = rating.map(contest =>  contest.newRating - contest.oldRating);
        data = "+" + Math.max(...change);
    }
    else if(parseInt(index)===4) {
        const change = rating.map(contest =>  contest.newRating - contest.oldRating);
        if(Math.min(...change) < 0) {
            data = Math.min(...change);
        }
        else {
            data = "I never look down."
        }
    }
    
    return ( 
        <p>
            {data}
        </p>
     );
}
 
export default LoadData;