<!-- <div class="form-group mb-2">
								<label class="form-label required" for="new_app_id">App ID</label>
								<input type="text" name="new_app_id" class="form-control mt-2" id="new_app_id" required
									placeholder="Enter your app id" required>
							</div> -->
							<!-- <div class="form-group mb-2">
								<label class="form-label required">Choose Option</label>
								<div class="form-check mt-2">
									<input class="form-check-input" type="radio" name="app_option" id="app_id" value="app_id" required>
									<label class="form-check-label" for="app_id">App ID</label>
									<input class="form-check-input" type="radio" name="app_option" id="app_name" value="app_name" required>
									<label class="form-check-label" for="app_name">App Name</label>
								</div>
							</div> -->
							<div class="form-group mb-2">
    <label class="form-label required">Choose Option</label>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="app_option" id="app_id" value="App ID" required>
        <label class="form-check-label" for="app_id">App ID</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="app_option" id="app_name" value="App Name" required>
        <label class="form-check-label" for="app_name">App Name</label>
    </div>
</div>

<!-- Input field that will show when a radio is selected -->
<div class="form-group mb-2" id="new_app_id" >
    <input type="text" name="new_app_id" class="form-control" placeholder="Enter value">
</div>

<!-- <script>
document.querySelectorAll('input[name="app_option"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        const inputField = document.getElementById('app_input_field');
        inputField.style.display = 'block';
        inputField.querySelector('input').placeholder = "Enter " + this.value;
    });
});
</script> -->

							<!-- <div class="form-group mb-2">
								<label class="form-label required" for="new_app_id">API Key</label>
								<input type="text" name="app_api_key" class="form-control mt-2" id="app_api_key"
									required placeholder="Enter your API key" required>
							</div> -->
							<div class="form-group mb-2">
								<label class="form-label required" for="app_api_key">API Key</label>
								<input type="text" name="app_api_key" class="form-control mt-2" id="app_api_key" value="st3nq9hwyzaafd732jqt2kvaewsxd6rr" readonly>
							</div>

















                                 try {

            $merchantId = Yii::$app->user->identity->id;
            $post_data = Yii::$app->request->post();
            $appId = $post_data['app_id'];
            $appName = $post_data['app_name'];
            $partnerToken = GupshupSsUtility::getBfPartnerToken();

            // Regenerate the token of the partner token
            GupshupSsUtility::regeneratePartnerToken($partnerToken->email, $partnerToken->password, $partnerToken->token_updated_at);

            if(!empty($appId)){
                // Get APP DATA Based on the app id and partner id
                $appInfo = GupshupSsUtility::getPartnerAppInfo($appId, $partnerToken->token);
                $appInfoArr = json_decode($appInfo);
    
                if ($appInfoArr->response->status == 'error') return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Error while getting the app info.']);
                if (empty($appInfoArr))   return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Getting partner info failed.']);
    
                // Link App with BillFree
                $appKey = $post_data['app_key'];
                $linkApp = GupshupSsUtility::linkApp($appKey, $appInfoArr->response->appDetails->name, $partnerToken->token);
                $linkApp = json_decode($linkApp);

                // print_r($linkApp);
                // die;
    
                if ($linkApp->response->status == "error") {
                    return json_encode(['error' => true, 'response' => $linkApp, 'message' =>  $linkApp->response->message]);
                }
            }

            if(!empty($appName)){
                 // Link App with BillFree
                $appKey = $post_data['app_key'];
                $linkApp = GupshupSsUtility::linkApp($appKey, $appName, $partnerToken->token);
                $linkApp = json_decode($linkApp);
    
                // Check for re-linking error specifically - if found, handle it specially
                if ($linkApp->response->status == "error" && strpos(strtolower($linkApp->response->message), "unable to link application - re-linking of application to same partner is not allowed") !== false) {
                    // Re-linking error detected - continue processing but get app info differently
                    $appInfo = GupshupSsUtility::getPartnerAppInfo($appId, $partnerToken->token);
                    $appInfoArr = json_decode($appInfo);
                } else if ($linkApp->response->status == "error") {
                    return json_encode(['error' => true, 'response' => $linkApp, 'message' =>  $linkApp->response->message]);
                } else {
                    // Success case - get app info normally
                    $appId = $linkApp->response->partnerApps->id;
                    $appInfo = GupshupSsUtility::getPartnerAppInfo($appId, $partnerToken->token);
                    $appInfoArr = json_decode($appInfo);
                }
    
                if ($appInfoArr->response->status == 'error') return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Error while getting the app info.']);
                if (empty($appInfoArr))   return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Getting partner info failed.']);
            }

            // App Info
            // Handle both success case and re-linking error case
            if (($appInfoArr->response->status == "success" && $linkApp->response->status == "success") || 
                ($linkApp->response->status == "error" && strpos(strtolower($linkApp->response->message), "unable to link application - re-linking of application to same partner is not allowed") !== false)) {

                // saving the app id along with the merchant
                $tokensModel = new BfGupshupSsTokens();
                $tokensModel->merchant_id = $merchantId;
                $tokensModel->app_id = $appId;
                $tokensModel->partner_id = $partnerToken->id;
                $tokensModel->app_name = $appInfoArr->response->appDetails->name;
                $tokensModel->live = $appInfoArr->response->appDetails->live;
                $tokensModel->waba_phone = (!empty($appInfoArr->response->appDetails->phone)) ? $appInfoArr->response->appDetails->phone : null;

                // Get App Access Token
                $appAccessToken = GupshupSsUtility::getAppAccessToken($appId, $partnerToken->token);
                $appAccessInfo = json_decode($appAccessToken);


                if ($appAccessInfo->response->status == "success") {
                    $tokensModel->access_token = $appAccessInfo->response->token->token;
                }

                if ($tokensModel->save()) {

                    if (isset($tokensModel) && !empty($tokensModel)) {
                        GupshupSsUtility::updateCallBackUrl($tokensModel->app_id, $tokensModel->access_token, $merchantId);
                        GupshupSsUtility::enableTemplate($tokensModel->app_id, $tokensModel->access_token);
                        GupshupSsUtility::enableDlrEvents($tokensModel->app_id, $tokensModel->access_token);

                        if ($tokensModel->live == 1 || $tokensModel->live == "1" || $tokensModel->live == true) {
                            // Creating a Default Bill Template
                            $wa_bill_templates = BfWaTemplates::find()->where(['merchant_id' => $merchantId, 'purpose' => "b"])->exists();
                            $purpose = ($wa_bill_templates) ?  "o" : "b";
                            GupshupSsUtility::defaultBillTemplateCreate($merchantId, $tokensModel->app_id, $tokensModel->access_token, $purpose);
                            GupshupSsUtility::importAllGupshupSsTemplates($merchantId); // Import All Template
                            GupshupSsUtility::setMerchantWaOperator($merchantId, 'gupshup-ss'); // setting wa operator as gupshup-ss
                        }
                    }

                    return $appInfo;
                } else {
                    print_r($tokensModel->getAttributes());
                    print_r($tokensModel->getErrors());
                    exit;
                }
            } else {
                return json_encode(['error' => true, 'message' => 'Info may not correct while getting appInfo or linkApp.']);
            }

            return json_encode(['error' => true, 'message' => 'Something went wrong!']);
        } catch (Exception $e) {
            return json_encode(['error' => true, 'message' => 'Caught exception: ',  $e->getMessage(), "\n"]);
        }
    }




























        public function actionConnectApp()
    {
        try {

            $merchantId = Yii::$app->user->identity->id;
            $post_data = Yii::$app->request->post();
            $appId = $post_data['app_id'];
            $appName = $post_data['app_name'];
            $partnerToken = GupshupSsUtility::getBfPartnerToken();

            // Regenerate the token of the partner token
            GupshupSsUtility::regeneratePartnerToken($partnerToken->email, $partnerToken->password, $partnerToken->token_updated_at);

            if(!empty($appId)){
                // Get APP DATA Based on the app id and partner id
                $appInfo = GupshupSsUtility::getPartnerAppInfo($appId, $partnerToken->token);
                $appInfoArr = json_decode($appInfo);
    
                if ($appInfoArr->response->status == 'error') return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Error while getting the app info.']);
                if (empty($appInfoArr))   return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Getting partner info failed.']);
    
                // Link App with BillFree
                $appKey = $post_data['app_key'];
                $linkApp = GupshupSsUtility::linkApp($appKey, $appInfoArr->response->appDetails->name, $partnerToken->token);
                $linkApp = json_decode($linkApp);

                // print_r($linkApp);
                // die;
    
                if ($linkApp->response->status == "error") {
                    return json_encode(['error' => true, 'response' => $linkApp, 'message' =>  $linkApp->response->message]);
                }
            }

            if(!empty($appName)){
                 // Link App with BillFree
                $appKey = $post_data['app_key'];
                $linkApp = GupshupSsUtility::linkApp($appKey, $appName, $partnerToken->token);
                $linkApp = json_decode($linkApp);
    
                if ($linkApp->response->status == "error") {
                    return json_encode(['error' => true, 'response' => $linkApp, 'message' =>  $linkApp->response->message]);
                }

                // Get APP DATA Based on the app id and partner id
                $appId = $linkApp->response->partnerApps->id;
                $appInfo = GupshupSsUtility::getPartnerAppInfo($appId, $partnerToken->token);
                $appInfoArr = json_decode($appInfo);
    
                if ($appInfoArr->response->status == 'error') return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Error while getting the app info.']);
                if (empty($appInfoArr))   return json_encode(['error' => true, 'response' => $appInfo, 'message' =>  'Getting partner info failed.']);
            }

            // App Info
            // if ($appInfoArr->response->status == "success" && $linkApp->response->status == "success") {
            if ($linkApp->response->status == "error" && strpos(strtolower($linkApp->response->message), "unable to link application - re-linking of application to same partner is not allowed") !== false) {

                // saving the app id along with the merchant
                $tokensModel = new BfGupshupSsTokens();
                $tokensModel->merchant_id = $merchantId;
                $tokensModel->app_id = $appId;
                $tokensModel->partner_id = $partnerToken->id;
                $tokensModel->app_name = $appInfoArr->response->appDetails->name;
                $tokensModel->live = $appInfoArr->response->appDetails->live;
                $tokensModel->waba_phone = (!empty($appInfoArr->response->appDetails->phone)) ? $appInfoArr->response->appDetails->phone : null;

                // Get App Access Token
                $appAccessToken = GupshupSsUtility::getAppAccessToken($appId, $partnerToken->token);
                $appAccessInfo = json_decode($appAccessToken);


                if ($appAccessInfo->response->status == "success") {
                    $tokensModel->access_token = $appAccessInfo->response->token->token;
                }

                if ($tokensModel->save()) {

                    if (isset($tokensModel) && !empty($tokensModel)) {
                        GupshupSsUtility::updateCallBackUrl($tokensModel->app_id, $tokensModel->access_token, $merchantId);
                        GupshupSsUtility::enableTemplate($tokensModel->app_id, $tokensModel->access_token);
                        GupshupSsUtility::enableDlrEvents($tokensModel->app_id, $tokensModel->access_token);

                        if ($tokensModel->live == 1 || $tokensModel->live == "1" || $tokensModel->live == true) {
                            // Creating a Default Bill Template
                            $wa_bill_templates = BfWaTemplates::find()->where(['merchant_id' => $merchantId, 'purpose' => "b"])->exists();
                            $purpose = ($wa_bill_templates) ?  "o" : "b";
                            GupshupSsUtility::defaultBillTemplateCreate($merchantId, $tokensModel->app_id, $tokensModel->access_token, $purpose);
                            GupshupSsUtility::importAllGupshupSsTemplates($merchantId); // Import All Template
                            GupshupSsUtility::setMerchantWaOperator($merchantId, 'gupshup-ss'); // setting wa operator as gupshup-ss
                        }
                    }

                    return $appInfo;
                } else {
                    print_r($tokensModel->getAttributes());
                    print_r($tokensModel->getErrors());
                    exit;
                }
            } else {
                return json_encode(['error' => true, 'message' => 'Info may not correct while getting appInfo or linkApp.']);
            }

            return json_encode(['error' => true, 'message' => 'Something went wrong!']);
        } catch (Exception $e) {
            return json_encode(['error' => true, 'message' => 'Caught exception: ',  $e->getMessage(), "\n"]);
        }
    }




    	// let selectedOption = $('input[name="app_option"]:checked').val();
	// if (selectedOption === 'app_name') {
    // if (apiName.val().trim() === "") {
    //     apiName.focus();
    //     apiName.addClass("is-invalid");
    //     loader("remove", "connect_app_btn", connectNowButtonHtml);
    //     return false;
    // } else {
    //     apiName.removeClass("is-invalid");
    // }
}

// if (selectedOption === 'app_id') {
//     if (appId.val().trim() === "") {
//         appId.focus();
//         appId.addClass("is-invalid");
//         loader("remove", "connect_app_btn", connectNowButtonHtml);
//         return false;
//     } else {
//         appId.removeClass("is-invalid");
//     }
// }