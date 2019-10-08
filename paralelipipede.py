file = open('input1.txt', 'r')

# input data
input_data = []
for line in file:
	object = line.split()
	for i in range(3):
		object[i] = int(object[i])
	input_data.append(object)

# finding the biggest surfaces
largest_diameter = 0
largest_surface = {}
second_largest_surface = {}

def elim_max(max_1, num):
	if num is max_1:
		return False
	return True

for object in input_data:
	
	max_1 = max(object)
	max_2 = max(filter(lambda num: elim_max(max_1, num), object))
	small_num = min(object)

	if (max_1, max_2) in largest_surface:
		if largest_surface[(max_1, max_2)] < small_num:
			second_largest_surface[(max_1, max_2)] = largest_surface[(max_1, max_2)]
			largest_surface[(max_1, max_2)] = small_num
			current_diameter = largest_surface[(max_1, max_2)] + second_largest_surface[(max_1, max_2)]

		elif (max_1, max_2) not in second_largest_surface or second_largest_surface[(max_1, max_2)] < small_num:
			second_largest_surface[(max_1, max_2)] = small_num
			current_diameter = largest_surface[(max_1, max_2)] + second_largest_surface[(max_1, max_2)]
	
	else:
		largest_surface[(max_1, max_2)] = small_num
		current_diameter = small_num

	if current_diameter > largest_diameter:
		largest_diameter = current_diameter

print(largest_diameter / 2)

