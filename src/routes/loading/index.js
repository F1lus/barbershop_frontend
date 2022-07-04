

const Loading = ({ loading, children }) => {

    const isLoading = () => {
        if(loading){
            return <div><div className='div'></div><div className='div'></div><div className='div'></div><div className='div'></div></div>
        }
    }

    return (
        <div>
            <div className={loading ? 'lds-ring' : ''}>
                {children}
            </div>
            {isLoading()}
        </div>
    )

}

export default Loading