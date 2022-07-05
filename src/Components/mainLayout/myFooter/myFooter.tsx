import "./myFooter.css";

const Footer = () => {
    return (
        <>
            <footer id="footer" className="footer footer-bg-color">
                <div >
                <hr/>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3 Container1">
                                <div className="module-heading">
                                    <h5 className="module-title header-bg-color">
                                        Help and Support
                                    </h5>
                                </div>

                                <div className="module-body">
                                    <ul className="list-unstyled">
                                        <li className="first">
                                            <a href="#" title="Contact us">
                                                Term of Use
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                title="Popular Searches"
                                            >
                                                Orders and Returns
                                            </a>
                                        </li>
                                        <li className="last">
                                            <a
                                                href="#"
                                                title="Where is my order?"
                                            >
                                                Deliveries
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-3 Container1">
                                <div className="module-heading">
                                    <h5 className="module-title header-bg-color">
                                        Customer Service
                                    </h5>
                                </div>

                                <div className="module-body">
                                    <ul className="list-unstyled">
                                        <li className="first">
                                            <a href="#customerMainPage" title="Contact us">
                                                My Account
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="About us">
                                                Order History
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="faq">
                                                FAQ
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                title="Popular Searches"
                                            >
                                                Specials
                                            </a>
                                        </li>
                                        <li className="last">
                                            <a
                                                href="#"
                                                title="Where is my order?"
                                            >
                                                Help Center
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-3 Container1">
                                <div className="module-heading">
                                    <h5 className="module-title header-bg-color">Corporation</h5>
                                </div>

                                <div className="module-body">
                                    <ul className="list-unstyled">
                                        <li className="first">
                                            <a title="Your Account" href="#">
                                                About us
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Information" href="#">
                                                Customer Service
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Addresses" href="#">
                                                Company
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Addresses" href="#">
                                                Investor Relations
                                            </a>
                                        </li>
                                        <li className="last">
                                            <a title="Orders History" href="#">
                                                Advanced Search
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-3 Container1">
                                <div className="module-heading">
                                    <h5 className="module-title header-bg-color">Why Choose Us</h5>
                                </div>

                                <div className="module-body">
                                    <ul className="list-unstyled">
                                        <li className="first">
                                            <a href="#" title="About us">
                                                Shopping Guide
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Blog">
                                                Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Company">
                                                Company
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                title="Investor Relations"
                                            >
                                                Investor Relations
                                            </a>
                                        </li>
                                        <li className=" last">
                                            
                                            <a
                                                
                                                title="Suppliers"
                                            >
                                                Contact Us
                                            </a>
                                           
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-bar">
                    <div className="container">
                        <div className="col-xs-12 col-sm-12 no-padding copyright">
                            &copy; 2022 CupOn.nent  All Rights Reserved.{" "}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

function MyFooter(): JSX.Element {
    return (
        <div className="myFooter">
			{Footer()}
        </div>
    );
}

export default MyFooter;
