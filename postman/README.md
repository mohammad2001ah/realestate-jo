# QA-008 Postman API Tests

Built from the current backend routes/controllers in this repository.

## Import
- `Real_Estate_Jordan_QA-008.postman_collection.json`
- `Real_Estate_Jordan_Local.postman_environment.json`

Start the backend on `http://localhost:5000`, select the Local environment, then run the collection in folder order.

## Admin tests
Admin requests are skipped until `adminEmail` and `adminPassword` are set and **Login Existing Admin** succeeds.

## Security write tests
`runSecurityWriteTests` defaults to `false`. Set it to `true` only on a local/test database.

## Expected regression/security failures on current code
- Login with missing password should be 400/422, not 500.
- Login with numeric password should be 400/422, not 500.
- Malformed property ObjectId should be 400/404, not 500.
- Pending property should not be publicly retrievable before approval.
- Public registration should not allow `role: admin`.

## Notes
The suite creates temporary QA user/agent accounts. Cleanup requires an existing admin account. Actual image-file upload is left manual because local file paths are machine-specific.
