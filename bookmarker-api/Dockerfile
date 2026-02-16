FROM eclipse-temurin:21-jdk-jammy

# target 디렉토리에서 모든 war 파일을 app.war로 추가
ADD target/*.jar app.jar

# 파일의 수정 시간을 현재 시간으로 설정
RUN sh -c 'touch /app.jar'

# 컨테이너 내부의 포트 8080을 외부에 노출
EXPOSE 8080

# 애플리케이션을 실행할 명령어 설정
ENTRYPOINT [ "sh", "-c", "java -jar /app.jar" ]