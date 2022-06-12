import "./updatePassword.css";

function UpdatePassword(): JSX.Element {
    {/*
const location = useLocation();
    const {companyId} = location.state as any;
    const [company, setCompany] = useState(new company_details());
    const {register, handleSubmit} = useForm<company_details>();
    const navigate = useNavigate();

    useEffect (()=>{
        setCompany(store.getState().companyState.company.find(item=>companyId==item.id));
    }, [])
    
    const send = ()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        jwtAxios.put(globals.urls.updatePassword, company.password)
        .then(response=>{
            if(response.status==300){
                msgNotify.success("Company password updated.")
            }else{
                msgNotify.error("Invalid password");
            }       
        })
        .then(()=>{
            store.dispatch(updatePassword(?????)); 
        })
        .catch(err=>{
            msgNotify.error(err);
        })
    }
    const passChange = (args:SyntheticEvent)=>{
        company.password = (args.target as HTMLInputElement).value;
    }
*/}
    return (
        <div className="updatePassword SolidBox">
			<h1 style={{textAlign:"center"}}>Change password</h1><hr/>
            <form>
                {/*
                <TextField name="currentPassword" label={company.password} type="password" variant="outlined" className="TextBox" fullWidth
                disabled helperText="current Password"/>

                <TextField name="newPassword" label="New Password" variant="outlined" className="TextBox" fullWidth {...register("password",{
                    required:{
                        value:true,
                        message: 'Missing Email'
                    }
                })}  onChange={passChange} helperText="New password"/> */}
            </form>
        </div>
    );
}

export default UpdatePassword;
