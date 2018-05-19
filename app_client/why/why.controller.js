(function() {

    angular
	.module('berygoodApp')
	.controller('whyCtrl', whyCtrl);

    whyCtrl.$inject = ['$sce'];
    function whyCtrl($sce) {
	var vm = this;


	vm.main = {
	    title: 'Энэ web application-ийг яагаад үүсгэх болсон бэ?',
	    content: 'Хот хоорондын зорчигч тээврээр үйлчлүүлж байгаа хүмүүсийг очих газар нь хүлээн авах хүмүүс тосож авах цагаа тааруулахын тулд байн байн залгаж хаана явааг нь асуудаг. Тэгвэл энэ web application нь хүлээн авах хүн тухайн зорчигчийн зорчиж буй чиглэл, хөдлөсөн цаг огноо, зорчиж буй тээврийн хэрэгслийн жолооч ба улсын дугаар гэсэн мэдээлэл дээр тулгуурлан интернетэд холбогдон тухайн зорчиж буй тээврийн хэрэгслийн байршил болон зорьсон газраа очих хугацааг ойролцоогоор мэдэх боломжийг олгоно.'
	}
	vm.main.title = $sce.trustAsHtml(vm.main.title);
	vm.main.content = $sce.trustAsHtml(vm.main.content);
    }
})();


