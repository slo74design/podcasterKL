const Loader = () => {
    let circleCommonClasses = "h-2.5 w-2.5 bg-current rounded-full";

    return (
        <div className="flex max-w-screen max-h-screen items-center justify-center p-12">
            <div className={`${circleCommonClasses} mr-1`}></div>
            <div className={`${circleCommonClasses} mr-1`}></div>
            <div className={`${circleCommonClasses}`}></div>
        </div>
    );
};

export default Loader;
