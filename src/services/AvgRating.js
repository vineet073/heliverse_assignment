export default function AvgRating(ratingArr){
    if(ratingArr?.length === 0) return 0;

    const totalReviewCounts=ratingArr?.reduce((acc,curr)=>{
        return acc+=curr?.rating;
    },0);

    const multiplier=10;
    const avgReviewCount=Math.round((totalReviewCounts/ratingArr?.length) * multiplier) /multiplier;
    return avgReviewCount;

}