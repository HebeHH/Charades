# for ((i=91;i<=190;i++)); do

# variable=93,75,74,72,71,70,66,64,63,61,59,52,39,28,27,26,25,24,23,15,14,13,9,8,7,6,4,3
variable=69,68,67,62,58,57,56,55,54,53,40,30,2,1
for i in $(echo $variable | sed "s/,/ /g"); 
do
for j in {1..2}; 
do
# echo $i >> src/words.json
curl 'https://randomwordgenerator.com/pictionary.php' \
  -H 'authority: randomwordgenerator.com' \
  -H 'accept: */*' \
  -H 'dnt: 1' \
  -H 'x-csrf-token: 9eYGIZIfPnfQyyjsI26uyPAgn9bw7rx0nQwDadCTe_2igkBE1HRENICZHqsRHfuKmkmygciG0QCsOFA6j8IUpA==' \
  -H 'x-requested-with: XMLHttpRequest' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \
  -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'origin: https://randomwordgenerator.com' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://randomwordgenerator.com/pictionary.php' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'cookie: __cfduid=ddd9b8885eae8542317ed1597a31d87721590880395; PHPSESSID=f648533e6417d679f05beb534b2b4316; _csrf=55a87d569e4eae8091f9fdeba9de9ed6967f753facbe407ddf4b5f7a872fb01ea%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22WdFeFkzCPR6G2sUBji-W8hmt14SS_QoY%22%3B%7D; _ga=GA1.2.664845924.1590880396; _gid=GA1.2.341354260.1590880396' \
  --data 'category='$i'&game=1&count=50&_csrf=9eYGIZIfPnfQyyjsI26uyPAgn9bw7rx0nQwDadCTe_2igkBE1HRENICZHqsRHfuKmkmygciG0QCsOFA6j8IUpA%3D%3D' \
  --compressed >> src/words2.json
  echo "" >> src/words2.json
done
done