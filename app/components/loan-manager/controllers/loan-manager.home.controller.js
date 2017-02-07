//CONTROLLERS
(function() {
    var moduleName     = 'loan-manager',
        controllerName = 'loanManagerHomeController';
    controller.$inject = ['$scope','$stateParams','entityAbm','entitySearch','$http','endpoints','$filter','$uibModal','$state'];

    function controller($scope, $stateParams, entityAbm, entitySearch, $http, endpoints, $filter, $uibModal, $state) {
        $scope.showBooks = true;
        $scope.showSamples = false;
        $scope.lockdown = false;
        $scope.forms = {};
        $scope.loan = {
            loanType: 'REMOTE',
            withdrawDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        };

        $scope.showSample = function(sampleId) {
            $scope.showBooks = false;
            $scope.showSamples = true;
        }

        $scope.deselectBook = function() {
            $scope.showBooks = true;
            $scope.showSamples = false;
        }

        entitySearch.getAllEntities('members').then(function(result){
            $scope.allMembers = result.data;
        });
        entitySearch.getAllEntities('samples').then(function(result){
            $scope.allSamples = result.data;
        });
        entitySearch.getAllEntities('books').then(function(result){
            $scope.allBooks = result.data;
        });
        entitySearch.getAllEntities('loans').then(function(result){
            $scope.allLoans = result.data;
        });

        $scope.availableSamples = function(book) {
            return book.samples.filter(function(sample) {return sample.availableForLoan === "True"}).length;
        }

        $scope.setBook = function(book) {
            $scope.book = book;
        }

        $scope.unsetBook = function() {
            $scope.book = undefined;
        }

        $scope.setSearchedBarCode = function(barCode, returnBool) {
            if (!returnBool) {
                $scope.searchedBarCode = barCode;
            } else {
                $scope.searchedReturnBarCode = barCode;
            }
        }

        $scope.filterAvailable = function(samples) {
            return samples.filter(function(sample){
                return sample.availableForLoan === "True";
            });
        };

        $scope.showWithdrawConfirmation = function() {
            return modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'app/components/loan-manager/templates/loan-manager.quick-withdraw-confirmation.html',
                controller: 'loanManagerQuickWithdrawConfirmationController',
                resolve: {
                    items: function() {
                        return  {
                            member: $scope.member,
                            loan: $scope.loan,
                            book: $scope.book,
                            sample: $scope.sample
                        }
                    }
                }
            });
        };

        $scope.hideFromHome = function(loan) {
            $http.put(endpoints.HIDE_LOAN.replace(":id", loan.id), {display: "HIDE"}).then(function() {
                loan.display = "HIDE";
            }, function(error){
                alert("Hubo un error al no mostrar el prestamo. El error es: " + error);
            });
        }

        $scope.findByKey = function(array, key, value) {
            var foundItem = undefined;
            angular.forEach(array, function(item) {
                if (item[key] === value) {
                    foundItem = item;
                }
            });
            if (foundItem) { return foundItem } else { return false }
        }

        $scope.isBadLoanPost = function(dni, barCode) { //Funcion super villera
            var dniFound = $scope.findByKey($scope.allMembers, 'dni', dni);
            var barCodeFound = $scope.findByKey($scope.allSamples, 'barCode', barCode);

            if (dniFound) {$scope.member = dniFound;}
            if (barCodeFound) {$scope.sample = barCodeFound;}

            if (!barCodeFound) {
                return ("El código no existe en la base de datos");
            };
            if (!dniFound) {
                return ("El DNI no existe en la base de datos");
            };
            return false;
        };


        $scope.assembleLoanObject = function(loanType) {
             return {
             memberId: $scope.member.id,
             sampleId: $scope.sample.id,
             withdrawDate: $scope.loan.withdrawDate,
             agreedReturnDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
             comment: '',
             loanType: loanType
             };
        }

        $scope.postLoan = function(loanType) {
            $scope.loan.loanType = loanType;
            if ($scope.forms.withdrawForm.$invalid) {
                $scope.forms.withdrawForm.$setSubmitted();
                return;
            }
            $scope.lockdown = true;
            if($scope.forms.withdrawForm.$valid) {
                var prePostError = $scope.isBadLoanPost($scope.searchedDni, $scope.searchedBarCode);
                if (!prePostError) {
                    $scope.showWithdrawConfirmation().result.then(function(){
                        $http.post(endpoints.POST_LOAN, $scope.assembleLoanObject(loanType)).then(function() {
                            $scope.genericError = undefined;
                            $scope.lockdown = false;
                            alert("El préstamo ha sido realizado con éxito")
                            window.location.reload()

                        }, function(error){
                            $scope.genericError = error.data.message;
                            $scope.lockdown = false;
                        });
                    });
                } else {
                    $scope.genericError = prePostError;
                    $scope.lockdown = false;
                }
            };
        };

        $scope.mostLoanedBookCompare = function(samples1, samples2) {
                if (samples2.value.split(',').length === 0) return -1;
                return (samples1.value.split(',').length < samples2.value.split(',').length) ? 1 : -1;
        };

        $scope.getMemberFullName = function(loan) {
            var memberFound = $scope.findByKey($scope.allMembers, 'id', loan.memberId);
            return ( memberFound.lastName + ', ' + memberFound.firstName)
        }

        $scope.getLoanBarCode = function(loan) {
            var sample = $scope.findByKey($scope.allSamples, 'id', loan.sampleId);
            return ( sample.barCode )
        }

        $scope.mostCurrentLoan = function(agreedReturnDateStr1, agreedReturnDateStr2) {
            var agreedReturnDate1 = new Date(agreedReturnDateStr1.value);
            var agreedReturnDate2 = new Date(agreedReturnDateStr2.value);
            return (agreedReturnDate1 > agreedReturnDate2) ? -1 : 1;
        }

        $scope.assembleReturnLoanObject = function() {
            var obj = $scope.returnLoan;
            obj.returnDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            obj.comment = '';
            return obj;
        };

        $scope.isBadLoanPut = function(barCode) { //Funcion super villera
            var sampleFound = $scope.findByKey($scope.allSamples, 'barCode', barCode);
            var loanFound = $scope.findByKey($scope.allLoans, 'sampleId', sampleFound.id);

            if (loanFound) {$scope.returnLoan = loanFound;}

            if (!sampleFound || !sampleFound ) {
                return ("El código no existe en la base de datos");
            };
            return false;
        };

        $scope.postReturn = function() {
            if ($scope.forms.returnForm.$invalid) {
                $scope.forms.returnForm.$setSubmitted();
                return;
            }
            $scope.lockdown = true;
            if($scope.forms.returnForm.$valid) {
                var prePostError = $scope.isBadLoanPut($scope.searchedReturnBarCode);
                if (!prePostError) {
                    $scope.showReturnConfirmation().result.then(function(){
                        $http.put(endpoints.PUT_LOAN.replace(":id",$scope.returnLoan.id), $scope.assembleReturnLoanObject()).then(function() {
                            $scope.returnGenericError = undefined;
                            $scope.lockdown = false;
                            alert("La devolución ha sido realizada con éxito")
                            window.location.reload()
                        }, function(error){
                            $scope.returnGenericError = error.data.message;
                            $scope.lockdown = false;
                        });
                    });
                } else {
                    $scope.returnGenericError = prePostError;
                    $scope.lockdown = false;
                }
            };
        };

        $scope.showReturnConfirmation = function() {
            return modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'app/components/loan-manager/templates/loan-manager.quick-return-confirmation.html',
                controller: 'loanManagerQuickReturnConfirmationController',
                resolve: {
                    items: function() {
                        return  {
                            loan: $scope.returnLoan
                        }
                    }
                }
            });
        };




    }
    angular.module(moduleName).controller(controllerName, controller);
})();
