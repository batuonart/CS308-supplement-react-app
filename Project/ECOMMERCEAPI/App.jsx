const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/pay">
                    <Pay />
                </Route>
                <Route path="/succeed">
                    <Success />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;