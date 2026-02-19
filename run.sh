declare dc_infra=docker-compose-db.yml
declare dc_app=docker-compose-app.yml

# 애플리케이션을 빌드
function build_api(){
    cd bookmarker-api
    ./mvnw clean package -DdkipTests
    cd ..
}

# 데이터베이스 인프라 시작 -f 또는  --follow 로그를 실시간으로 스트리밍
function start_infra(){
    echo "Starting db docker containers ..."
    docker-compose -f ${dc_infra} up -d
    docker-compose -f ${dc_infra} logs -f
}

# 데이터베이스 인프라 중지
function stop_infra(){
    echo "Stopping db docker containers ..."
    docker-compose -f ${dc_infra} stop
    docker-compose -f ${dc_infra} rm -f
}

# 모든 서비스 시작
function start(){
    build_api
    echo "Starting DB and Application containers ..."
    docker-compose -f ${dc_infra} -f ${dc_app} up -d    
    #실시간 로그 출력 필요 없을시 주석
    #docker-compose -f ${dc_infra} -f ${dc_app} logs -f
}

# 모든 서비스 중지
function stop(){
    echo "Stopping DB and Application containers ..."
    docker-compose -f ${dc_infra} -f ${dc_app} stop
    docker-compose -f ${dc_infra} -f ${dc_app} rm -f
}
# 모든 서비스 재시작
function restart(){
    stop
    sleep 3
    start
}

#action="start": 기본 동작을 start로 설정
action="start"

# $#: 이 변수를 사용하면 스크립트에 전달된 명령행 인자의 개수를 확인
# $@: 이 변수는 스크립트에 전달된 모든 인자를 리스트 형태로 나타냄
# fi if문을 종료 하는 코드
if [[ "$#" != "0" ]]
then
    action=$@
fi

#action 변수의 값을 평가하여 실행
eval ${action}