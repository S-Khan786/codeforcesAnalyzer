import {RankColor} from "../data/RankColor";
const Profile = ({profile}) => {
    const rank = profile.rank;
    const maxRank = profile.maxRank;
    const data = RankColor;

    const rankStyle = data.filter(levels => levels.level === rank)
    const maxRankStyle = data.filter(levels => levels.level === maxRank)
    
    return (
        <div className="text-lg my-4">
            <h1>
            rank: 
            <span className={`${rankStyle[0].color} mx-1 font-semibold`}>{rank}</span> 
            (<span className="font-light ">max:</span> 
            <span className={`${maxRankStyle[0].color} ml-1 font-semibold`}>{maxRank}</span>)
            </h1>
        </div>
    );
}
 
export default Profile;