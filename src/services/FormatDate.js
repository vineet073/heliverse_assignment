const FormatDate = (dateString) => {
    const options={year:"numeric", month:"long", day:"numeric"};
    const date=new Date(dateString);
    const formattedDate=date.toLocaleDateString("en-US",options);

    const hour=date.getHours();
    const minutes=date.getMinutes();
    const period=hour>=12?"PM":"AM";
    const formattedTime=`${hour%12}:${minutes} ${period}`;

    return `${formattedDate} | ${formattedTime}`  
}

export default FormatDate
