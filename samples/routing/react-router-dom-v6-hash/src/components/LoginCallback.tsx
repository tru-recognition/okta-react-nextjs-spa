/*!
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const LoginCallback: React.FC<{
  homePath: string,
  loadingElement: React.ReactElement
}> = ({ homePath, loadingElement }) => {
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLoginRedirect = async () => {
      await oktaAuth.handleLoginRedirect();
    };
  
    if (oktaAuth.token.isLoginRedirect()) {
      handleLoginRedirect()
      .catch(e => {
        // TODO: handle error state(s)
        console.error(e);
      });
    }
    else {
      // we landed on root path, but do not have login callback params in url query string
      navigate(homePath, { replace: true });
    }
  }, [oktaAuth, navigate, homePath]);

  return loadingElement;
};

export default LoginCallback;
