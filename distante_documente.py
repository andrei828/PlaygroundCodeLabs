from collections import Counter
from math import sqrt

def dcos(document1, document2):
	content1 = document1.readline().split()
	content2 = document2.readline().split()

	doc_set = set()
	v1 = Counter(content1)
	v2 = Counter(content2)

	for word in content1 + content2:
		doc_set.add(word)

	# above sum
	above_sum = 0
	first_term = 0
	second_term = 0
	for word in doc_set:
		above_sum += (v1[word] * v2[word])
		first_term += (v1[word] * v1[word])
		second_term += (v2[word] * v2[word])

	return (above_sum / sqrt(first_term) / sqrt(second_term))
	



document1 = open('document1.txt', 'r')
document2 = open('document2.txt', 'r')

print('%.4f'%dcos(document1, document2))

